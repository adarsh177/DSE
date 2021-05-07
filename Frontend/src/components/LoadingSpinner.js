import { keyframes } from 'styled-components';
import SpinnerImage from '../resources/spinner.svg';
import styled from 'styled-components'

export default function LoadingSpinner(props){
    if(!props.show)
        return(<div style={{width: "35px", height: "35px"}}></div>);
    
    return(
        <SpinnerImg src={SpinnerImage}/>
    );
}

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const SpinnerImg = styled.img`
    width: 35px;
    height: 35px;
    object-fit: contain;
    animation: ${rotate} 1s linear infinite;
`;