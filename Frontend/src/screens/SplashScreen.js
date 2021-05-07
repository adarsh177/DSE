import React from 'react';
import PortisImage from '../resources/power_portis.svg'
import Logo from '../resources/logo.png';
import styled from 'styled-components';
import LoadingSpinner from '../components/LoadingSpinner';
import RefreshFloatBtn from '../components/RefreshFloatBtn';
import MyHoldingEntry from '../components/MyHoldingEntry';

class SplashScreen extends React.Component{
    constructor(props){
        super(props);
        this.state= {
            loaded: false,
            refreshing: false,
        }
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

export default SplashScreen;