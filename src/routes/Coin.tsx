import {useLocation, useParams} from "react-router-dom";
import styled from "styled-components";
import {useEffect, useState} from "react";

const Container = styled.div`
  //border: 1px solid red;
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
  //border: 1px solid blue;

`;
const Title = styled.h1`
  color: ${props => props.theme.accentColor};
  font-size: 48px;
`;

const Loader = styled.span`
  text-align: center;
  font-size: 20px;
  display: block;
`;

interface RouteParams {
    coinId: string;
}

interface RouteState {
    state: {
        name: string,
        symbol: string,
        rank: number,
        is_new: boolean,
        is_active: boolean,
        type: string,
    }
}

interface ITag {
    id: string;
    name: string;
    ico_counter: number;
    coin_counter: number;
}

interface InfoDataInterface {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    tags: ITag[],
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: boolean;
    hash_algorithm: string;
    first_data_at: string;
    last_data_at: string;
}

interface PriceDataInterface {
    beta_value: number;
    circulating_supply: number;
    first_data_at: string;
    id: string;
    last_updated: string;
    max_supply: number;
    name: string;
    quotes: {
        USD: {
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
        };
        rank: number;
        symbol: string;
        total_supply: number;
    }
    rank: number;
    symbol: string;
    total_supply: number;
}

function Coin() {
    const [loading, setLoading] = useState(true);
    // const {coinId} = useParams() as unknown as RouteParams;
    const {coinId} = useParams<"coinId">();
    const {state} = useLocation() as RouteState;

    const [infoData, setInfoData] = useState<InfoDataInterface>();
    const [priceData, setPriceData] = useState<PriceDataInterface>();

    useEffect(() => {
        (async () => {
            const infoData = await (await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();
            const priceData = await (await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)).json();
            setInfoData(infoData);
            setPriceData(priceData);

            // console.log(infoData);
            // console.log(priceData);
            setLoading(false);
        })();
    }, []);

    return (
        <Container>
            <Header>
                <Title>코인 {state?.name || "loading..."}</Title>
            </Header>
            {loading ? (
                <Loader>loading</Loader>
            ) : <span>{infoData?.description}</span>}
        </Container>
    );
}

export default Coin;