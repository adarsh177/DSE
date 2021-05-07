import styled, { keyframes } from 'styled-components';
import RefreshImg from '../resources/refresh.svg';

export default function RefreshFloatBtn(props){
    return(
        <OuterButton onClick={() => props.onClick()}>
            {props.refreshing ? 
              <InnerImageAnimate src={RefreshImg} />
              :
              <InnerImage src={RefreshImg}/>
            }
        </OuterButton>
    );
};


const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg); 
  }
`;

const OuterButton = styled.div`
    @media (max-width: 500px){
      width: 30px;
      height: 30px;
      right: 20px;
    }

    @media (min-width: 501px){
      width: 20px;
      height: 20px;
      right: 10px;
    }
    
    padding: 15px;
    position: absolute;
    bottom: 30px;
    background-color: var(--main-color);
    border-radius: 50px;
    box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.25);

    :hover{
      cursor: pointer;
    }
`;

const InnerImage = styled.img`
    @media (max-width: 500px){
      width: 30px;
      height: 30px;
    }

    @media (min-width: 501px){
      width: 20px;
      height: 20px;
    }
    object-fit: contain;
`;

const InnerImageAnimate = styled.img`
    @media (max-width: 500px){
      width: 30px;
      height: 30px;
    }

    @media (min-width: 501px){
      width: 20px;
      height: 20px;
    }
    object-fit: contain;
    animation: ${rotate} 1.5s linear infinite;
`;