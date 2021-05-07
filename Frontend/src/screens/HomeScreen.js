import React from 'react';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import MyHoldingEntry from '../components/MyHoldingEntry';
import RefreshFloatBtn from '../components/RefreshFloatBtn';

class HomeScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        };
    }

    ShowAllStocks(){
        this.props.history.push('/Stocks');
    }

    render(){
        return(
            <div className="MainContainer">
                <div className="MobileContainer MobileContainerFlow">
                    <div className="MobileContainerScroll">
                        <AllStocksBtn onClick={() => this.ShowAllStocks()}>ALL STOCKS</AllStocksBtn>
                        <span style={{marginTop: "40px"}}>
                            <StatTitle>Wallet ID</StatTitle>
                            <StatValue>3412ASFD4ASDFASD</StatValue>
                            <StatTitle>Wallet Balance</StatTitle>
                            <StatValue>12 ether</StatValue>
                            <StatTitle>Portfolio Net Worth</StatTitle>
                            <StatValue>123 ether</StatValue>
                        </span>

                        <HoldingTitle>Your Holdings</HoldingTitle>
                        <MyHoldingEntry companyName="Reliance Industries" stockCount="25" rate="0.9" onClick={() => this.props.history.push('/Company')} />
                        <MyHoldingEntry companyName="Reliance Industries" stockCount="25" rate="0.9" onClick={() => this.props.history.push('/Company')} />
                        <MyHoldingEntry companyName="Reliance Industries" stockCount="25" rate="0.9" onClick={() => this.props.history.push('/Company')} />
                        <MyHoldingEntry companyName="Reliance Industries" stockCount="25" rate="0.9" onClick={() => this.props.history.push('/Company')} />
                        <MyHoldingEntry companyName="Reliance Industries" stockCount="25" rate="0.9" onClick={() => this.props.history.push('/Company')} style={{marginBottom: "50px"}}/>
                    </div>
                    <RefreshFloatBtn />
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
    font-size: 1em;
    color: black;
    font-weight: 700;
    margin-bottom: 10px;
`;

const HoldingTitle = styled.p`
    font-size: 1.2em;
    font-weight: 700;
    color: var(--main-color);
    align-self: center;
    margin-top: 20px;
    margin-bottom: 20px;
`;


export default withRouter(HomeScreen);