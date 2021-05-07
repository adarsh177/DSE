import styled from 'styled-components';

// companyName, stockCount, rate
export default function MyHoldingEntry(props){
    return(
        <OuterContainer style={props.style} onClick={() => props.onClick()}>
            <CompanyName>{props.companyName}</CompanyName>
            <Field style={{textAlign: "right"}}>{props.stockCount} Stocks</Field>
            <Field><b style={{color: "black"}}>Rate: </b> {props.rate} Ether/ Stock</Field>
            <Field style={{textAlign: "right"}}>{props.stockCount * props.rate} Ether</Field>
        </OuterContainer>
    )
}

const OuterContainer = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 75% 25%;
    grid-row-gap: 8px;
    padding-bottom: 10px;
    border-bottom: 1px solid gray;
    margin-bottom: 10px;
    
    :hover{
        cursor: pointer;
    }
`;

const CompanyName = styled.p`
    font-size: 1.1em;
    color: black;
    font-weight: 700;
`;

const Field = styled.p`
    font-size: 0.9em;
    color: gray;
    font-weight: 600;
`;