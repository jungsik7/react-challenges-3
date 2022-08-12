import styled from "styled-components";
import {Link} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {fetchCoins} from "../api";
import React from "react";


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

const CoinsList = styled.ul`

`;

const Coin = styled.li`
  background-color: ${(props) => props.theme.cardBgColor};
  color: ${props => props.theme.textColor};
  margin-bottom: 10px;
  padding: 20px;
  border-radius: 15px;
  margin-bottom: 10px;
  border: 1px solid white;

  a {
    //border: 1px solid red;
    display: flex;
    align-items: center;
    padding: 3px;
    transition: color 0.2s ease-in;
  }

  &:hover {
    a {
      color: ${props => props.theme.accentColor};

    }
  }
`;

const Title = styled.h1`
  color: ${props => props.theme.accentColor};
  font-size: 48px;
  //border: 1px solid red;
`;

const ThemeMode = styled.button`
  //border: 1px solid blue;
  margin: 10px 0px;
  height: 40px;
  border-radius: 20px;
  cursor: pointer;
  width: 160px;
  border: 1px solid white;
  background-color: ${(props) => props.theme.cardBgColor};
  color: ${props => props.theme.textColor};  
`;

const Loader = styled.span`
  text-align: center;
  font-size: 20px;
  display: block;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

interface ICoin {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,
}

interface ICoinProps {
    toggleIsDark: () => void
    isDark: boolean;
}

function Coins({toggleIsDark, isDark}: ICoinProps) {
    const {isLoading, data} = useQuery<ICoin[]>(["allCoins"], fetchCoins);

    return (
        <Container>
            <Header>
                <Title>코인</Title>

            </Header>
            <ThemeMode onClick={toggleIsDark}>Toggle Mode</ThemeMode>
            {isLoading ? (
                <Loader>loading</Loader>
            ) : (
                <CoinsList>
                    {data?.slice(0, 100).map(coin => (
                        <Coin key={coin.id}>
                            <Link to={`/${coin.id}`}
                                  state={{
                                      name: coin.name,
                                      symbol: coin.symbol,
                                      rank: coin.rank,
                                      is_new: coin.is_new,
                                      is_active: coin.is_active,
                                      type: coin.type,
                                  }}>
                                <Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                                     alt=""/>
                                {coin.name} &rarr;
                            </Link>
                        </Coin>
                    ))}
                </CoinsList>)}
        </Container>
    );
}

export default Coins;