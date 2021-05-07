import React from 'react';
import styled from 'styled-components';
import RefreshFloatBtn from '../components/RefreshFloatBtn';
import TransactionsEntry from '../components/TransactionsEntry';
import BackImg from '../resources/back.svg';
import RefreshImg from '../resources/refresh_black.svg';


class CompanyScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            currentTab: "desc", // desc, tran
        }
    }

    OnTabClicked(tab){
        this.setState({
            currentTab: tab
        });
    }

    render(){
        return(
            <div className="MainContainer">
                <div className="MobileContainer MobileContainerFlow">
                    <TopBar>
                        <Icon src={BackImg}/>
                        <Icon src={RefreshImg}/>
                    </TopBar>

                    <CompanyName>Reliance Industries, REL</CompanyName>
                    <CurrentRate>1 Ether</CurrentRate>

                    <TabContainer>
                        <TabLabel selected={this.state.currentTab == 'desc'} onClick={() => this.OnTabClicked('desc')}>Description</TabLabel>
                        <TabLabel selected={this.state.currentTab == 'tran'} onClick={() => this.OnTabClicked('tran')}>Transactions</TabLabel>
                    </TabContainer>

                    {this.state.currentTab == 'desc' ? 
                        this.GetDescriptionTabView()
                        :
                        this.GetTransactionTabView()}
                    
                    <ButtonPanel>
                        <BottomButton disabled>SELL</BottomButton>
                        <BottomButton>BUY</BottomButton>
                    </ButtonPanel>
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
                        <StatValue>21 Stocks</StatValue>
                    </span>
                    <span style={{gridArea: "item2"}}></span>
                    
                    <span style={{gridArea: "item3"}}>
                        <StatTitle>Volume</StatTitle>
                        <StatValue>543321 Stocks</StatValue>
                    </span>
                    <span style={{gridArea: "item4"}}>
                        <StatTitle>Market Cap</StatTitle>
                        <StatValue>543321 Ethers</StatValue>
                    </span>

                    <span style={{gridArea: "item5"}}>
                        <StatTitle>Max</StatTitle>
                        <StatValue>1.2 Ethers</StatValue>
                    </span>
                    <span style={{gridArea: "item6"}}>
                        <StatTitle>Min</StatTitle>
                        <StatValue>0.6 Ethers</StatValue>
                    </span>

                    <span style={{gridArea: "desc"}}>
                        <StatTitle>Description</StatTitle>
                        <StatValue style={{marginBottom: "60px"}}>Reliance Industries Limited is an Indian multinational conglomerate company headquartered in Mumbai, India. Reliance owns businesses across India engaged in energy, petrochemicals, textiles, natural resources, retail, and telecommunications. Reliance Industries Limited is an Indian multinational conglomerate company headquartered in Mumbai, India. Reliance owns businesses across India engaged in energy, petrochemicals, textiles, natural resources, retail, and telecommunications.</StatValue>
                    </span>
                </DescGrid>
            </TabView>
        )
    }

    GetTransactionTabView(){
        return(
            <TabView>
                <TransactionsEntry from="SADFAS3435245344RAWFDAS" />
                <TransactionsEntry from="SADFAS3435245344RAWFDAS" />
                <TransactionsEntry from="SADFAS3435245344RAWFDAS" />
                <TransactionsEntry from="SADFAS3435245344RAWFDAS" />
                <TransactionsEntry from="SADFAS3435245344RAWFDAS" />
                <TransactionsEntry from="SADFAS3435245344RAWFDAS" />
                <TransactionsEntry from="SADFAS3435245344RAWFDAS" />
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
    margin-bottom: -10px;
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
`;

export default CompanyScreen;
