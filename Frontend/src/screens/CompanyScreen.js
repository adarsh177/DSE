import React, { Fragment } from 'react';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import RefreshFloatBtn from '../components/RefreshFloatBtn';
import TransactionsEntry from '../components/TransactionsEntry';
import BackImg from '../resources/back.svg';
import RefreshImg from '../resources/refresh_black.svg';
import CompanyABI from '../Artifacts/CompanyABI.json';
import BuyDialog from '../components/BuyDialog';
import SellDialog from '../components/SellDialog';
import Web3 from 'web3';


class CompanyScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            currentTab: "desc", // desc, tran
            description: {
                id: null,
                name: '',
                rate: 0,
                volume: 0,
                maxrate: 0,
                minrate: 0,
                desc: ""
            },
            holdings: 0, // a number
            listingsRate: 0, // rate at which holdings are held
            listings: 0, // a number
            contractAddress: null,
            transactions: null, // {from, to, amount, rate}
            dialog: '', // buy, sell or ''
        }
    }

    OnTabClicked(tab){
        if(tab == 'desc' && (this.state.transactions == null || this.state.transactions.length == 0)){
            this.LoadTransactions();
        }

        this.setState({
            currentTab: tab
        });
    }

    GoBack(){
        this.props.history.goBack();
    }

    componentDidMount(){
        // check if all initialized else return to splash
        if(window.portisAccount == null){
            console.log('Invalid data, getting back to splash screen');
            this.props.history.push('/');
            return;
        }

        console.log('Company Page mounted : ' + new Date().getTime());
        if(this.state.description.id == null)
            this.LoadData();
    }

    LoadTransactions(){
        if(this.state.contractAddress == null)
            return;
        
        this.companyContract = new window.web3.eth.Contract(CompanyABI.abi, this.state.contractAddress);
        this.companyContract.getPastEvents('Transaction')
            .then(events => {
                console.log('events', events);
                this.state.transactions = [];
                events.forEach(event => {
                    if(event.returnValues._to !== null && event.returnValues._from !== null){
                        this.state.transactions.push({
                            to: event.returnValues._to,
                            from: event.returnValues._from,
                            amount: event.returnValues.amount,
                            rate: event.returnValues.rate,
                        });
                    }
                });
                console.log('Final TRANSACTIONS', this.state.transactions);
                this.forceUpdate();
            })
            .catch(err => {
                console.log('Error loading transaction events', err);
                alert(`Error loading transaction events: ${err}`);
            });
    }

    LoadData(){
        var data = {};
        var query = this.props.location.search.replace('?', '');
        query.split('&').forEach(pair => {
            data[pair.split('=')[0]] = pair.split('=')[1];
        })
        
        if(!data['stockId']){
            this.props.history.goBack();
            return;
        }

        window.exchangeContract.methods.getCompanyDetail(data['stockId'])
            .call({from: window.portisAccount})
            .then(details => {
                console.log('details', details);
                this.state.description = {
                    id: details[0],
                    name: details[1],
                    rate: details[4],
                    volume: details[3],
                    maxrate: details[5],
                    minrate: details[6],
                    desc: details[7]
                };

                this.setState({
                    holdings: details[8],
                    listingsRate: details[10],
                    listings: details[9],
                    contractAddress: details[2]
                }, () => {
                    if(this.state.transactions == null)
                        this.LoadTransactions();
                });
            })
            .catch(err => {
                console.log('Error loading company details', err);
                alert('Error loading company details: ' + err + '. Please try again');
            })
    }

    RefreshPressed(){
        if(this.state.currentTab == 'desc')
            this.LoadData();
        else
            this.LoadTransactions();
    }

    BuyStocks(stocks, maxrate){
        try{
            var stocksVal = parseInt(stocks, 10);
            var rateVal = parseInt(maxrate, 10);
            if(stocksVal <= 0 || rateVal <= 0){
                alert('While buying stocks, Amount of Stocks and rate should be positive whole numbers');
                return;
            }

            var value = stocksVal * rateVal;

            window.exchangeContract.methods.buyStock(this.state.description.id, rateVal, stocksVal)
                .send({from: window.portisAccount, value: Web3.utils.toWei(value + '', "ether")})
                .on("transactionHash", (hash) => {
                    alert('Stock buy request send. Stocks will reflect in your account in some time! In case stock buy request is rejected, you will get a full refund.');
                    setTimeout(() => this.LoadData(), 2500);
                })
                .on("error", (error, recept) => {
                    alert("Errer buying stocks : " + error);
                    console.log('Error buying stocks ', error, recept);
                });
        }catch(ex){
            console.log('error value buy stock', ex);
            alert('While buying stocks, Amount of Stocks and rate should be positive whole numbers');
        }

        this.setState({dialog: ''});
    }

    SellStocks(stocks, rate){
        try{
            var stocksVal = parseInt(stocks, 10);
            var rateVal = parseInt(rate, 10);
            if(stocksVal <= 0 || rateVal <= 0){
                alert('While selling stocks, rate should be positive whole numbers');
                return;
            }
            if(stocksVal > this.state.holdings){
                alert(`You only own ${this.state.holdings} stocks. So you can't sell more than that`);
                return;
            }

            console.log(this.state.description.id, stocksVal, rateVal);
            window.exchangeContract.methods.listStocks(this.state.description.id, stocksVal, rateVal)
            .send({from: window.portisAccount})
            .on("transactionHash", (hash) => {
                console.log('Stocks listed', data);
                alert('Your stocks have been listed for sale. They will be added to your account as holdings in some time.')
                setTimeout(() => this.LoadData(), 2500);
            })
            .on("error", (error, recept) => {
                console.log('Stocks listing error: ', error, recept);
                alert('Error Selling stocks : ' + error);
            });

        }catch(ex){
            console.log('error value buy stock', ex);
        }
        this.setState({dialog: ''});
    }

    UnlistStocks(){
        window.exchangeContract.methods.unlistStocks(this.state.description.id)
            .send({from: window.portisAccount})
            .on("transactionHash", (hash) => {
                console.log('Stocks unlisted', data);
                alert('Your stocks have been unlisted for sale. As soon as they are bought, your wallet will be credited with the amount. Also, You could anytime unlist your stocks and keep them with you.')
                setTimeout(() => this.LoadData(), 2500);
            })
            .on("error", (error, recept) => {
                console.log('Stocks unlisting error: ', error, recept);
                alert('Error Unlisting stocks : ' + error);
            });
    }

    render(){
        return(
            <div className="MainContainer">
                <div className="MobileContainer MobileContainerFlow">
                    <TopBar>
                        <Icon onClick={() => this.GoBack()} src={BackImg}/>
                        <Icon onClick={() => this.RefreshPressed()} src={RefreshImg}/>
                    </TopBar>

                    <CompanyName>{this.state.description.name !== '' ? `${this.state.description.name}, ${this.state.description.id}` : "Loading..."}</CompanyName>
                    <CurrentRate>{this.state.description.rate ? this.state.description.rate : "..."} Ether</CurrentRate>

                    <TabContainer>
                        <TabLabel selected={this.state.currentTab == 'desc'} onClick={() => this.OnTabClicked('desc')}>Description</TabLabel>
                        <TabLabel selected={this.state.currentTab == 'tran'} onClick={() => this.OnTabClicked('tran')}>Transactions</TabLabel>
                    </TabContainer>

                    {this.state.currentTab == 'desc' ? 
                        this.GetDescriptionTabView()
                        :
                        this.GetTransactionTabView()}
                    
                    <ButtonPanel>
                        <BottomButton onClick={() => this.setState({dialog: 'sell'})} disabled={this.state.holdings == 0}>SELL</BottomButton>
                        <BottomButton onClick={() => this.setState({dialog: 'buy'})} >BUY</BottomButton>
                    </ButtonPanel>

                    {this.state.dialog === 'buy' && 
                        <BuyDialog
                            currentRate={this.state.description.rate}
                            onClose={() => this.setState({dialog: ''})}
                            onBuyClick={(stocks, rate) => this.BuyStocks(stocks, rate)}
                            />
                    }

                    {this.state.dialog === 'sell' && 
                        <SellDialog 
                            currentRate={this.state.description.rate}
                            stocks={this.state.holdings}
                            onClose={() => this.setState({dialog: ''})}
                            onSellClick={(stocks, rate) => this.SellStocks(stocks, rate)}
                            />
                    }
                </div>
            </div>
        );
    }

    GetDescriptionTabView(){
        return(
            <TabView>
                <DescGrid>
                    <span style={{gridArea: "item1"}}>
                        <StatTitle>Your Holdings</StatTitle>
                        <StatValue>{this.state.holdings} Stocks</StatValue>
                    </span>
                    <span style={{gridArea: "item2"}}>
                        {this.state.listings > 0 && 
                        <Fragment>
                            <StatTitle clickable onClick={() => this.UnlistStocks()}>Listings(click to unlist)</StatTitle>
                            <StatValue>{this.state.listings} Stocks</StatValue>
                        </Fragment>}
                    </span>
                    
                    <span style={{gridArea: "item3"}}>
                        <StatTitle>Volume</StatTitle>
                        <StatValue>{this.state.description.volume} Stocks</StatValue>
                    </span>
                    <span style={{gridArea: "item4"}}>
                        <StatTitle>Market Cap</StatTitle>
                        <StatValue>{this.state.description.rate * this.state.description.volume} Ethers</StatValue>
                    </span>

                    <span style={{gridArea: "item5"}}>
                        <StatTitle>Max</StatTitle>
                        <StatValue>{this.state.description.maxrate} Ethers</StatValue>
                    </span>
                    <span style={{gridArea: "item6"}}>
                        <StatTitle>Min</StatTitle>
                        <StatValue>{this.state.description.minrate} Ethers</StatValue>
                    </span>

                    <span style={{gridArea: "desc"}}>
                        <StatTitle>Description</StatTitle>
                        <StatValue style={{marginBottom: "60px"}}>
                            {this.state.description.desc}
                        </StatValue>
                    </span>
                </DescGrid>
            </TabView>
        )
    }

    GetTransactionTabView(){
        return(
            <TabView>
                {this.state.transactions && this.state.transactions.length > 0 ?
                    this.state.transactions.map(trans => {
                        return(
                            <TransactionsEntry 
                                to={trans.to}
                                from={trans.from}
                                rate={trans.rate} 
                                stocks={trans.amount}/>
                        );
                    })
                    :
                    <NoTransactions>No Transactions Yet</NoTransactions>
                }
            </TabView>
        )
    }
}

const TopBar = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const Icon = styled.img`
    width: 20px;
    height: 20px;
    padding: 5px;
    object-fit: contain;

    :hover{
        cursor: pointer;
    }
`;

const CompanyName = styled.p`
    font-size: 1.2em;
    color: #6B6B6B;
    font-weight: 400;
    margin-top: 20px;
`;

const CurrentRate = styled.p`
    font-size: 2.2em;
    color: var(--main-color);
    font-weight: 600;
`;

const TabContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-end;
    flex-wrap: wrap;
    margin-top: 20px;
    margin-bottom: 20px;
`;

const TabLabel = styled.button`
    font-size: 1.1em;
    color: ${props => props.selected ? "black" : "#AEAEAE"};
    border: none;
    background-color: transparent;
    border-bottom: ${props => props.selected ? "1px solid black": "none"};
    padding-bottom: 4px;
    margin-right: 15px;
    outline: none;

    :hover{
        cursor: pointer;
        border-bottom: 1px solid black;
    }
`;

const TabView = styled.div`
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    overflow-y: auto;
`;

const DescGrid = styled.div`
    width: 100%;
    display: grid;
    grid-template-areas: 'item1 item2' 'item3 item4' 'item5 item6' 'desc desc';
    grid-column-gap: 10px;
    grid-row-gap: 10px;
`;

const StatTitle = styled.p`
    font-size: 0.8em;
    color: #8A8A8A;
    font-weight: 600;
    margin-bottom: 5px;

    :hover{
        cursor: ${props => props.clickable ? "pointer": "text"};
    }
`;

const StatValue = styled.p`
    font-size: 1em;
    color: black;
    font-weight: 700;
    margin-bottom: 10px;
`;

const ButtonPanel = styled.div`
    width: calc(100% + 40px);
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-top: 10px;
    margin-left: -20px;

    @media (max-width: 500px){
        margin-bottom: -10px;
    }
    @media (min-width: 501px){
        margin-bottom: -20px;
    }
`;

const BottomButton = styled.div`
    color: var(--sec-color);
    background-color: ${props => props.disabled ? "gray" : "var(--main-color)"};
    font-size: 1em;
    font-weight: 400;
    flex: 1;
    outline: none;
    border: 0.5px solid gray;
    text-align: center;
    padding: 10px;

    :hover{
        cursor: pointer;
    }
`;

const NoTransactions = styled.p`
    font-size: 1.4em;
    color: #9e9e9e;
    font-weight: 700;
    align-self: center;
    margin-top: 40px;
`;

export default withRouter(CompanyScreen);
