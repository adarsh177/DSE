import React from 'react';
import styled from 'styled-components';
import BuyDialog from '../components/BuyDialog';
import RefreshFloatBtn from '../components/RefreshFloatBtn';
import SellDialog from '../components/SellDialog';
import StockEntry from '../components/StockEntry';
import TransactionsEntry from '../components/TransactionsEntry';
import BackImg from '../resources/back.svg';
import RefreshImg from '../resources/refresh_black.svg';


class StocksScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            currentTab: "desc", // desc, tran
        }
    }

    render(){
        return(
            <div className="MainContainer">
                <div className="MobileContainer MobileContainerFlow">
                    <TopBar>
                        <Icon src={BackImg}/>
                        <Title>ALL STOCKS</Title>
                        <Icon src={RefreshImg} />
                    </TopBar>
                    
                    <StockList>
                        <StockEntry />
                        <StockEntry />
                        <StockEntry />
                        <StockEntry />
                        <StockEntry />
                        <StockEntry />
                        <StockEntry />
                        <StockEntry />
                        <StockEntry />
                        <StockEntry />
                        <StockEntry />
                        <StockEntry />
                        <StockEntry />
                        <StockEntry />
                        <StockEntry />
                        <StockEntry />
                        <StockEntry />
                        <StockEntry />
                        <StockEntry />
                        <StockEntry />
                        <StockEntry />
                    </StockList>

                    <BuyDialog />
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

export default StocksScreen;
