import styled from 'styled-components';

export default function MyHoldingEntry(props){
    return(
        <OuterContainer style={props.style}>
            <CompanyName>Reliance Industries</CompanyName>
            <Field style={{textAlign: "right"}}>123 Stocks</Field>
            <Field><b style={{color: "black"}}>Rate: </b> 123 Ether</Field>
            <Field style={{textAlign: "right"}}>25 Ether</Field>
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