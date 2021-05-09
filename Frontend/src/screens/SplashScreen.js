import React from 'react';
import PortisImage from '../resources/power_portis.svg'
import Logo from '../resources/logo.png';
import styled from 'styled-components';
import LoadingSpinner from '../components/LoadingSpinner';
import { withRouter } from 'react-router';
import Portis from '@portis/web3';
import Web3 from 'web3';
import Exchange from '../Artifacts/ExchangeABI.json';
import Company from '../Artifacts/CompanyABI.json';
import Config from '../Config.json';

class SplashScreen extends React.Component{
    constructor(props){
        super(props);
        this.state= {
            loaded: false,
            refreshing: false,
        }
    }
    
    componentDidMount(){
        this.loadWeb3AndPortis();
    }

    async loadWeb3AndPortis(){
        try{
            window.portis = new Portis(Config.portisAppId, {
                nodeUrl: Config.nodeUrl,
                chainId: Config.chainId
            });
            window.web3 = new Web3(window.portis.provider);
        }catch(err){
            alert('Error Logging in : ' + err + '. Please Retry.');
            this.loadWeb3AndPortis();
        }
        
        window.web3.eth.getAccounts().then(accounts => {
            window.portisAccount = accounts[0];
            console.log(`Account: ${window.portisAccount}`);
            window.exchangeContract = new window.web3.eth.Contract(Exchange.abi, Config.exchangeContractAddress);
            setTimeout(() => {
                this.props.history.push('/Dashboard');
            }, 2000);
        }).catch(err => {
            alert('Error Logging in : ' + err + '. Please Retry.');
            this.loadWeb3AndPortis();
        })
    }

    render(){
        return(
          <div className="MainContainer">
              <MobileContainer className="MobileContainer MobileContainerFlow" style={{justifyContent: "space-evenly", alignItems: "center"}}>
                  <span  style={{marginTop: "40px", textAlign: "center"}}>
                    <SplashImage src={Logo} />
                    <TitleSpan>
                        <h2>DECENTRALIZED</h2>
                        <h3>STOCK EXCHANGE</h3>
                    </TitleSpan>
                  </span>
                  <LoadingSpinner show={!this.state.loaded} />
                  <PoweredPortis src={PortisImage} />
              </MobileContainer>
          </div>  
        );
    }
}

const MobileContainer = styled.div`
    justify-content: flex-end;
    align-items: center;
`;

const PoweredPortis = styled.img`
    width: 100px;
`;

const TitleSpan = styled.span`
    text-align: center;
    color: var(--main-color);
    margin-top: 20px;
`;

const SplashImage = styled.img`
    width: 200px;
`;

export default withRouter(SplashScreen);