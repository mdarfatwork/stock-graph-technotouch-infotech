"use client";

import React from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export interface CandleData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
}

interface ApexCandleChartProps {
  data: CandleData[];
  width?: number | string;
  height?: number;
  className?: string;
}

const ApexCandleChart: React.FC<ApexCandleChartProps> = ({
  data,
  width = "100%",
  height = 500,
  className,
}) => {
  const chartData = data.map((item, index) => ({
    x: index,
    y: [item.open, item.high, item.low, item.close],
  }));

  const categories = data.map((item) => item.time);

  const last10Indices = chartData
    .slice(-10)
    .map((_, i) => chartData.length - 10 + i);

  const annotations: ApexOptions["annotations"] = {
    xaxis: last10Indices.map((index) => {
      const candle = data[index];
      const isGreen = candle.close >= candle.open;

      return {
        x: index,
        strokeDashArray: 0,
        borderColor: isGreen ? "#26a69a" : "#ef5350",
        fillColor: isGreen ? "rgba(38,166,154,0.15)" : "rgba(239,83,80,0.15)",
        opacity: 0.5,
        label: {
          text: isGreen ? "Bull" : "Bear",
          style: {
            color: "#fff",
            background: isGreen ? "#26a69a" : "#ef5350",
          },
        },
      };
    }),
  };

  const options: ApexOptions = {
    chart: {
      type: "candlestick",
      height,
      toolbar: { show: true },
      background: "#ffffff",
    },
    title: {
      text: "Candlestick Chart",
      align: "left",
    },
    xaxis: {
      type: "category",
      categories: categories,
      labels: {
        rotate: -45,
        rotateAlways: false,
      },
      tooltip: { enabled: false },
    },
    tooltip: {
      shared: true,
      custom: ({ seriesIndex, dataPointIndex, w }) => {
        const dataPoint =
          w.globals.initialSeries[seriesIndex].data[dataPointIndex];
        const [open, high, low, close] = dataPoint.y;

        const candle = data[dataPointIndex];
        const date = new Date(candle.time);

        const dateTimeString = `${date.toLocaleDateString(
          "en-GB"
        )} ${date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}`;

        return `
      <div class="bg-white p-2 border rounded shadow">
        <div class="font-semibold mb-1">${dateTimeString}</div>
        <div class="text-gray-600">Open: ₹${open.toFixed(2)}</div>
        <div class="text-gray-600">High: ₹${high.toFixed(2)}</div>
        <div class="text-gray-600">Low: ₹${low.toFixed(2)}</div>
        <div class="text-gray-600">Close: ₹${close.toFixed(2)}</div>
      </div>
    `;
      },
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: "#26a69a",
          downward: "#ef5350",
        },
        wick: { useFillColor: true },
      },
    },
    grid: { borderColor: "#f0f0f0", strokeDashArray: 3 },
    annotations,
  };

  const series = [{ name: "Price", data: chartData }];

  return (
    <div className={`apex-candlestick-chart ${className}`}>
      <Chart
        options={options}
        series={series}
        type="candlestick"
        width={width}
        height={height}
      />
    </div>
  );
};

export default ApexCandleChart;
