import styled from 'styled-components';

// companyName, rate, marketCap
export default function StockEntry(props){
    return(
        <Container onClick={() => props.onClick()}>
            <CompanyName style={{gridArea: "company"}}>
                {props.companyName}
            </CompanyName>
            <Field style={{gridArea: "rate", textAlign: "end", paddingRight: "5px"}}>
                {props.rate} Ether/ Stock
            </Field>
            <Field style={{gridArea: "cap"}}>
                Market Cap: {props.marketCap} Ether
            </Field>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    display: grid;
    grid-template-areas: 'company company company rate' 'cap cap cap cap';
    grid-column-gap: 5px;
    grid-row-gap: 5px;
    padding-bottom: 5px;
    border-bottom: 1px solid #ABABAB;
    margin-bottom: 15px;
    grid-auto-rows: min-content;

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
