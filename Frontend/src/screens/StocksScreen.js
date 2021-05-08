import React from 'react';
import styled from 'styled-components';
import BuyDialog from '../components/BuyDialog';
import RefreshFloatBtn from '../components/RefreshFloatBtn';
import SellDialog from '../components/SellDialog';
import StockEntry from '../components/StockEntry';
import TransactionsEntry from '../components/TransactionsEntry';
import BackImg from '../resources/back.svg';
import RefreshImg from '../resources/refresh_black.svg';
import {withRouter} from 'react-router-dom';

class StocksScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            stocks: [],
            dataLoaded: false,
        }
    }

    componentDidMount(){
        // check if all initialized else return to splash
        if(window.portisAccount == null){
            console.log('Invalid data, getting back to splash screen');
            this.props.history.push('/');
            return;
        }

        console.log('AllStocks mounted : ' + new Date().getTime());
        if(!this.state.dataLoaded)
            this.LoadAllStocks();
    }

    LoadAllStocks(){
        window.exchangeContract.methods.getCompanyListDetailed()
            .call({from: window.portisAccount})
            .then(data => {
                var ids = data[0];
                var names = data[1];
                var volumes = data[2];
                var rates = data[3];

                this.state.stocks =  [];
                for(let i = 0; i < ids.length; i++){
                    this.state.stocks.push({
                        id: ids[i],
                        name: names[i],
                        volume: volumes[i],
                        rate: rates[i]
                    });
                }

                this.state.dataLoaded = true;
                this.forceUpdate();
            })
            .catch(err => {
                console.log('Error loading stocks ',err)
                alert(`Error loading stocks: ${err}. Please try again`);
            })
    }

    render(){
        return(
            <div className="MainContainer">
                <div className="MobileContainer MobileContainerFlow">
                    <TopBar>
                        <Icon onClick={() => this.props.history.goBack()} src={BackImg}/>
                        <Title>ALL STOCKS</Title>
                        <Icon onClick={() => this.LoadAllStocks()} src={RefreshImg} />
                    </TopBar>
                    
                    <StockList>
                        {this.state.stocks.map(stock => {
                            return(
                                <StockEntry 
                                    id={stock.id}
                                    companyName={stock.name} 
                                    rate={stock.rate} 
                                    marketCap={stock.volume * stock.rate} 
                                    onClick={() => this.props.history.push(`/Company?stockId=${stock.id}`)}/>
                            );
                        })}
                    </StockList>
                </div>
            </div>
        );
    }
}

const TopBar = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const Title = styled.p`
    flex: 1;
    font-size: 1.2em;
    font-weight: 600;
    color: black;
    margin-left: 10px;
    margin-right: 10px;
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

const StockList = styled.div`
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    overflow-y: auto;
    margin-top: 20px;
`;

export default withRouter(StocksScreen);
