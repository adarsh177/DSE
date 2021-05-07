import styled from 'styled-components';

export default function StockEntry(props){
    return(
        <Container>
            <CompanyName style={{gridArea: "company"}}>
                Reliance Industries
            </CompanyName>
            <Field style={{gridArea: "rate", textAlign: "end", paddingRight: "5px"}}>
                12 Ether
            </Field>
            <Field style={{gridArea: "cap"}}>
                Market Cap: 2564 Ether
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
