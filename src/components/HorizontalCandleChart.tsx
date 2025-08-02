"use client";

import React from "react";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export interface CandleData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

interface HorizontalCandleChartProps {
  data: CandleData[];
  width?: number | string;
  height?: number;
  className?: string;
}

const HorizontalCandleChart: React.FC<HorizontalCandleChartProps> = ({
  data,
  width = "100%",
  height = 500,
  className,
}) => {
  // Prepare data for horizontal bar chart
  const chartData = data.map((item) => ({
    x: new Date(item.time).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
    }), // x-axis = date
    y: Math.abs(item.close - item.open), // bar length
    open: item.open,
    close: item.close,
    high: item.high,
    low: item.low,
    color: item.close >= item.open ? "#26a69a" : "#ef5350", // green/red
  }));

  const options: any = {
    chart: {
      type: "bar",
      height,
      background: "#ffffff",
      toolbar: {
        show: true,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "50%",
        distributed: true,
      },
    },
    colors: chartData.map((d) => d.color),
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      title: { text: "Price Difference (₹)" },
      labels: {
        style: { colors: "#666", fontSize: "12px" },
      },
    },
    yaxis: {
      labels: {
        style: { colors: "#666", fontSize: "12px" },
      },
    },
    grid: {
      borderColor: "#f0f0f0",
      strokeDashArray: 3,
    },
    tooltip: {
      y: {
        formatter: (val: number, { dataPointIndex }: any) => {
          const d = chartData[dataPointIndex];
          return `Open: ₹${d.open.toFixed(2)} | Close: ₹${d.close.toFixed(
            2
          )} | High: ₹${d.high.toFixed(2)} | Low: ₹${d.low.toFixed(2)}`;
        },
      },
    },
  };

  const series = [
    {
      name: "Price Move",
      data: chartData.map((d) => d.y),
    },
  ];

  return (
    <div className={`apex-horizontal-candle-chart ${className}`}>
      <Chart options={options} series={series} type="bar" width={width} height={height} />
    </div>
  );
};

export default HorizontalCandleChart;
