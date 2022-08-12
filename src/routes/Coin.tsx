import {Link, Route, Routes, useLocation, useMatch, useNavigate, useParams} from "react-router-dom";
import styled from "styled-components";
import Chart from "./Chart";
import Price from "./Price";
import {useQuery} from "@tanstack/react-query";
import {fetchCoinInfo, fetchCoinPrice} from "../api";
import {Helmet, HelmetProvider} from "react-helmet-async"
import CandleChart from "./CandleChart";

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
  align-items: center;
`;

const Loader = styled.span`
  text-align: center;
  font-size: 20px;
  display: block;
`;


const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
          props.isActive ? props.theme.accentColor : props.theme.textColor};

  a {
    display: block;
  }
`;

const GoBack = styled.button`
  font-size: 14px;
  cursor: pointer;
  border: 1px solid black;
  border-radius: 15px;
  margin-bottom: 10px;
  width: 80px;
  height: 30px;
  background-color: rgba(0, 0, 0, 0.5);
  color: ${props => props.theme.accentColor}

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

interface ICoinProps {
    isDark: boolean;
}

function Coin({isDark}: ICoinProps) {

    const {coinId} = useParams<"coinId">();
    const {state} = useLocation() as RouteState;
    const priceMatch = useMatch("/:coinId/price");
    const chartMatch = useMatch("/:coinId/chart");
    const candleChartMatch = useMatch("/:coinId/candle-chart");

    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };


    const {
        isLoading: infoLoading,
        data: infoData
    } = useQuery<InfoDataInterface>(["info", coinId], () => fetchCoinInfo(coinId));
    const {
        isLoading: tickersLoading,
        data: tickersData
    } = useQuery<PriceDataInterface>(["tickers", coinId], () => fetchCoinPrice(coinId));

    const loading = infoLoading || tickersLoading;
    //
    // console.log(infoData)
    // console.log(tickersData)

    return (
        <Container>
            <HelmetProvider>
                <Helmet>
                    <title>
                        {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
                    </title>
                </Helmet>
            </HelmetProvider>
            <Header>
                <Title>
                    {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
                </Title>
            </Header>
            <GoBack>
                <Link to={"/"}>뒤로</Link>
            </GoBack>
            {loading ? (
                <Loader>loading</Loader>
            ) : (
                <>
                    <Overview>
                        <OverviewItem>
                            <span>Rank:</span>
                            <span>{infoData?.rank}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Symbol:</span>
                            <span>${infoData?.symbol}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Price:</span>
                            <span>{tickersData?.quotes.USD.price.toFixed(2)}</span>
                        </OverviewItem>
                    </Overview>
                    <Description>{infoData?.description}</Description>
                    <Overview>
                        <OverviewItem>
                            <span>Total Suply:</span>
                            <span>{tickersData?.total_supply.toLocaleString()}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Max Supply:</span>
                            <span>{tickersData?.max_supply.toLocaleString()}</span>
                        </OverviewItem>
                    </Overview>

                    <Tabs>
                        <Tab isActive={chartMatch !== null}>
                            <Link to={`/${coinId}/chart`}>Line Chart</Link>
                        </Tab>
                        <Tab isActive={candleChartMatch !== null}>
                            <Link to={`/${coinId}/candle-chart`}>Candlestick Charts</Link>
                        </Tab>
                        <Tab isActive={priceMatch !== null}>
                            <Link to={`/${coinId}/price`}
                                  state={{
                                      ath_date: tickersData?.quotes.USD.ath_date,
                                      ath_price: tickersData?.quotes.USD.ath_price,
                                      market_cap: tickersData?.quotes.USD.market_cap,
                                      market_cap_change_24h: tickersData?.quotes.USD.market_cap_change_24h,
                                      percent_change_1h: tickersData?.quotes.USD.percent_change_1h,
                                      percent_change_1y: tickersData?.quotes.USD.percent_change_1y,
                                      percent_change_6h: tickersData?.quotes.USD.percent_change_6h,
                                      percent_change_7d: tickersData?.quotes.USD.percent_change_7d,
                                      percent_change_12h: tickersData?.quotes.USD.percent_change_12h,
                                      percent_change_15m: tickersData?.quotes.USD.percent_change_15m,
                                      percent_change_24h: tickersData?.quotes.USD.percent_change_24h,
                                      percent_change_30d: tickersData?.quotes.USD.percent_change_30d,
                                      percent_change_30m: tickersData?.quotes.USD.percent_change_30m,
                                      percent_from_price_ath: tickersData?.quotes.USD.percent_from_price_ath,
                                      price: tickersData?.quotes.USD.price,
                                      volume_24h: tickersData?.quotes.USD.volume_24h,
                                      volume_24h_change_24h: tickersData?.quotes.USD.volume_24h_change_24h,
                                  }}>Price</Link>
                        </Tab>
                    </Tabs>
                    <Routes>
                        <Route path="chart" element={<Chart coinId={coinId ?? ""} isDark={isDark}/>}></Route>
                        <Route path="candle-chart"
                               element={<CandleChart coinId={coinId ?? ""} isDark={isDark}/>}></Route>
                        <Route path="price" element={<Price/>}></Route>

                    </Routes>
                </>
            )}
        </Container>
    );
}

export default Coin;