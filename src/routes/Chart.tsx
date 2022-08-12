import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import coin from "./Coin";
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

function Chart({coinId, isDark}: ChartProps) {
    // const params = useParams();
    // console.log(params);
    const {isLoading, data} = useQuery<IChartHistory[]>(["chart", coinId], () => fetchCoinHistory(coinId));

    // console.log(data);

    let chartData: IChartHistory[] = [];
    if (Array.isArray(data)) {
        chartData = data.slice();
    }


    return (
        <div>{isLoading ? "loading chart..." : (
            <ApexChart
                type="line"
                series={[
                    {
                        name: "Close",
                        data: chartData?.map((price) => price.close) ?? [],
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
                    grid: {show: false},
                    yaxis: {show: false},
                    xaxis: {
                        labels: {show: false},
                        axisTicks: {show: false},
                        axisBorder: {show: false},
                        type: "datetime",
                        categories: chartData?.map((data) => data.time_close * 1000) ?? [],
                    },
                    fill: {
                        type: "gradient",
                        gradient: {
                            gradientToColors: ["blue"], stops: [0, 100]
                        },
                    },
                    colors: ["red"],
                    tooltip: {
                        y: {
                            // formatter: (value) => `${new Date(value * 1000).toLocaleString()}`
                        }
                    }


                }}
            ></ApexChart>
        )}</div>
    );
}

export default Chart;