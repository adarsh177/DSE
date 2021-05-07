import { useState } from 'react';
import styled from 'styled-components';

// currentRate:number, onOuterClicked:func, onSellClicked(text):func
export default function BuyDialog(props){
    const [text, setText] = useState(props.currentRate);
    return(
        <OuterContainer >
            <Backdrop onClick={() => props.onOuterClick()} />
            <Dialog>
                <InnerDialog>
                    <Heading>Reliance Industries</Heading>
                    <Label>Price to list at:</Label>
                    <Input onChange={(event) => setText(event.target.value)} value={text} type="number" />
                    <Ether>Ether</Ether>
                    <Desc>Your shares will be listed and as soon as they gets sold, your wallet will be credited with the amount.</Desc>
                </InnerDialog>
                <ActionBtn onClick={() => props.onBuyClick(text)}>BUY</ActionBtn>
            </Dialog>
        </OuterContainer>
    )
}

const OuterContainer = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Backdrop = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 1;
`;

const Dialog = styled.div`
    width: 90%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    background-color: white;
    box-shadow: 1px 1px 2px 2px rgba(0, 0, 0, 0.25);
    z-index: 5;
`;

const InnerDialog = styled.div`
    width: calc(100% - 40px);
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
`;

const ActionBtn = styled.button`
    border: none;
    background-color: var(--main-color);
    color: white;
    font-size: 1em;
    padding: 15px;
    text-align: center;
    width: 100%;

    :hover{
        cursor: pointer;
    }
`;

const Heading = styled.h1`
    font-size: 1.4em;
    color: black;
    width: 100%;
    padding-bottom: 5px;
    border-bottom: 1px solid black;
`;

const Label = styled.label`
    font-size: 0.8em;
    color: black;
    font-weight: 600;
    margin-top: 20px;
    margin-bottom: 5px;
`;

const Input = styled.input`
    border: 1px solid var(--main-color);
    background-color: transparent;
    width: calc(100% - 20px);
    padding: 10px;
    font-size: 1.1em;
    color: black;

    ::placeholder{
        color: gray;
    }
`

const Ether = styled.p`
    color: gray;
    font-size: 1.1em;
    position: relative;
    transform: translateY(-150%) translateX(-10px);
    align-self: flex-end;
`;

const Desc = styled.p`
    color: gray;
    font-size: 0.8em;
`;