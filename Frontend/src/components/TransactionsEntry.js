import styled from 'styled-components';

// from, to, stocks, rate
export default function TransactionsEntry(props){
    return(
        <Container>
            <span style={{gridArea: "from"}}>
                <StatTitle>From</StatTitle>
                <StatValue>{props.from}</StatValue>
            </span>
            <span style={{gridArea: "to"}}>
                <StatTitle>To</StatTitle>
                <StatValue>{props.to}</StatValue>
            </span>
            <span style={{gridArea: "share"}}>
                <StatTitle>Shares</StatTitle>
                <StatValue>{props.stocks}</StatValue>
            </span>
            <span style={{gridArea: "rate"}}>
                <StatTitle>Rate</StatTitle>
                <StatValue>{props.rate} Ether/ Stock</StatValue>
            </span>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    display: grid;
    grid-template-areas: 'from from' 'to to' 'share rate';
    grid-column-gap: 10px;
    grid-row-gap: 10px;
    padding-bottom: 5px;
    border-bottom: 1px solid #ABABAB;
    margin-bottom: 10px;
    grid-auto-rows: min-content;
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

