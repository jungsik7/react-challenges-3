import {useLocation} from "react-router-dom";
import styled from "styled-components";
import Chart from "./Chart";
import {useQuery} from "@tanstack/react-query";
import {fetchCoinHistory} from "../api";
import ApexChart from "react-apexcharts";

interface ChartProps {
    coinId: string;
    isDark: boolean;
}

interface IChartHistory {
    "time_open": string;
    "time_close": number;
    "open": number;
    "high": number;
    "low": number;
    "close": number;
    "volume": number;
    "market_cap": number;

}

function CandleChart({coinId, isDark}: ChartProps) {
    const {isLoading, data} = useQuery<IChartHistory[]>(["candle_chart", coinId], () => fetchCoinHistory(coinId));

    // let chartData: IChartHistory[] = [];
    // if (Array.isArray(data)) {
    //     chartData = data.slice();
    // }


    const exceptData = data ?? [];
    const candleChartData = exceptData.map((i) => {
        return {
            x: i.time_close,
            y: [i.open, i.high, i.low, i.close],
        };
    });

    return (
        <div>{isLoading ? "loading chart..." : (
            <ApexChart
                type="candlestick"

                series={[
                    {
                        data: candleChartData,
                    },
                ]}
                options={{
                    chart: {
                        height: 500,
                        width: 300,
                        toolbar: {show: false},
                        background: "transparent"
                    },
                    theme: {
                        mode: isDark ? "dark" : "light"
                    },
                    stroke: {
                        curve: "smooth",
                        width: 2
                    },
                    // grid: {show: false},
                    yaxis: {show: false},
                    xaxis: {
                        labels: {show: false},
                        // axisTicks: {show: false},
                        // axisBorder: {show: false},
                        // type: "datetime",
                    },
                }}
            />

        )}</div>
    );
}


export default CandleChart;
