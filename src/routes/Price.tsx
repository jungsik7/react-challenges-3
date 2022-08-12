import {useLocation} from "react-router-dom";
import styled from "styled-components";

const ItemTitle = styled.ul`
  font-size: 12px;
  //font-weight: 400;
`;

const ItemData = styled.li`
  font-size: 12px;
  font-weight: 400;
`;


interface RouteState {
    state: {
        ath_date: string;
        ath_price: number;
        market_cap: number;
        market_cap_change_24h: number;
        percent_change_1h: number;
        percent_change_1y: number;
        percent_change_6h: number;
        percent_change_7d: number;
        percent_change_12h: number;
        percent_change_15m: number;
        percent_change_24h: number;
        percent_change_30d: number;
        percent_change_30m: number;
        percent_from_price_ath: number;
        price: number;
        volume_24h: number;
        volume_24h_change_24h: number;
    }
}

function Price() {
    const {state} = useLocation() as RouteState;

    return (
        <ItemTitle>
            <li>ath_date : {state?.ath_date}</li>
            <li>ath_price : {state?.ath_price}</li>
            <li>market_cap : {state?.market_cap}</li>
            <li>market_cap_change_24h : {state?.market_cap_change_24h}</li>
            <li>percent_change_1h : {state?.percent_change_1h}</li>
            <li>percent_change_1y : {state?.percent_change_1y}</li>
            <li>percent_change_6h : {state?.percent_change_6h}</li>
            <li>percent_change_7d : {state?.percent_change_7d}</li>
            <li>percent_change_12h : {state?.percent_change_12h}</li>
            <li>percent_change_15m : {state?.percent_change_15m}</li>
            <li>percent_change_24h : {state?.percent_change_24h}</li>
            <li>percent_change_30d : {state?.percent_change_30d}</li>
            <li>percent_change_30m : {state?.percent_change_30m}</li>
            <li>percent_from_price_ath : {state?.percent_from_price_ath}</li>
            <li>price : {state?.price}</li>
            <li>volume_24h : {state?.volume_24h}</li>
            <li>volume_24h_change_24h : {state?.volume_24h_change_24h}</li>
        </ItemTitle>
    );
}


export default Price;