import React from 'react';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import MyHoldingEntry from '../components/MyHoldingEntry';
import RefreshFloatBtn from '../components/RefreshFloatBtn';
import Web3 from 'web3';

class HomeScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            walletId: window.portisAccount,
            balance: null,
            netWorth: null,
            holdings: [], // {name, id, rate, stocks}
            refreshing: true,
        };
    }

    LoadPortfolio(){
        window.exchangeContract.methods.getUserPortfolio()
            .call({from: window.portisAccount})
            .then(data => {
                console.log('protfolio', data);
                const ids = data[0];
                const names = data[1];
                const rates = data[2];
                const stocks = data[3];
                this.state.holdings = [];
                for(let i = 0; i < ids.length; i++){
                    this.state.holdings.push({
                        id: ids[i],
                        name: names[i],
                        rate: rates[i],
                        stocks: stocks[i]
                    });
                }
                this.CalculateNetWorth();
                this.forceUpdate();
                setTimeout(() => {
                    this.setState({
                        refreshing: false,
                    });
                }, 1000);
            }).catch(err => {
                console.log(`Error loading portfolio ${err}`);
            });
    }

    LoadBalance(){
        console.log('Loading balance...');
        window.web3.eth.getBalance(window.portisAccount)
            .then(bal => {
                console.log('balance', bal);
                this.setState({
                    balance: `${Web3.utils.fromWei(bal, "ether")} Ethers`
                });
            }).catch(err => {
                console.log('Error loading balance', err);
                this.setState({
                    balance: `0 Ethers`
                });
            });
    }

    CalculateNetWorth(){
        this.state.netWorth = 0;
        this.state.holdings.forEach(holding => {
            this.state.netWorth += holding.rate * holding.stocks;
        });
        this.state.netWorth = `${this.state.netWorth} Ethers`;
    }

    componentDidMount(){
        // check if all initialized else return to splash
        if(window.portisAccount == null){
            console.log('Invalid data, getting back to splash screen');
            this.props.history.push('/');
            return;
        }

        console.log('Home mounted : ' + new Date().getTime());
        if(this.state.balance == null || this.state.netWorth == null){
            this.LoadPortfolio();
            this.LoadBalance();
        }
    }

    ShowAllStocks(){
        this.props.history.push('/Stocks');
    }

    MyHoldingClicked(id){
        this.props.history.push(`/Company?stockId=${id}`);
    }

    RefreshClicked(){
        this.setState({
            refreshing: true,
        });

        this.LoadBalance();
        this.LoadPortfolio();
    }

    render(){
        return(
            <div className="MainContainer">
                <div className="MobileContainer MobileContainerFlow">
                    <div className="MobileContainerScroll">
                        <AllStocksBtn onClick={() => this.ShowAllStocks()}>ALL STOCKS</AllStocksBtn>
                        <span style={{marginTop: "40px"}}>
                            <StatTitle>Wallet ID</StatTitle>
                            <StatValue small>{this.state.walletId}</StatValue>
                            <StatTitle>Wallet Balance</StatTitle>
                            <StatValue>{this.state.balance ? this.state.balance : "... Ethers"}</StatValue>
                            <StatTitle>Portfolio Net Worth</StatTitle>
                            <StatValue>{this.state.netWorth ? this.state.netWorth : "... Ethers"}</StatValue>
                        </span>

                        <HoldingTitle>Your Holdings</HoldingTitle>
                        {this.state.holdings.map(holding => {
                            return(
                            <MyHoldingEntry
                                key={holding.id}
                                companyName={holding.name} 
                                stockCount={holding.stocks} 
                                rate={holding.rate} 
                                onClick={() => this.MyHoldingClicked(holding.id)}/>
                            );
                        })}

                        {this.state.holdings.length == 0 &&
                            <NoHoldings>No Holdings Found!</NoHoldings>
                        }
                    </div>
                    <RefreshFloatBtn onClick={() => this.RefreshClicked()} refreshing={this.state.refreshing} />
                </div>
            </div>
        )
    }
}

const AllStocksBtn = styled.button`
    border: none;
    color: var(--main-color);
    font-weight: 700;
    font-size: 0.9em;
    align-self: flex-end;
    background-color: transparent;

    :hover{
        cursor: pointer;
    }
`;

const StatTitle = styled.p`
    font-size: 0.8em;
    color: #8A8A8A;
    font-weight: 600;
    margin-bottom: 5px;
`;

const StatValue = styled.p`
    /* font-size: ${(props) => props.small ? "0.6em" : "1em"}; */
    font-size: 1em;
    color: black;
    font-weight: 700;
    margin-bottom: 10px;
    max-width: 70%;
    overflow-wrap: break-word;
    
`;

const HoldingTitle = styled.p`
    font-size: 1.2em;
    font-weight: 700;
    color: var(--main-color);
    align-self: center;
    margin-top: 20px;
    margin-bottom: 20px;
`;

const NoHoldings = styled.p`
    font-size: 1.4em;
    color: #9e9e9e;
    font-weight: 700;
    align-self: center;
    margin-top: 40px;
`;


export default withRouter(HomeScreen);