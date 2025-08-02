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
  const chartData = data.map((item) => ({
    x: new Date(item.time).getTime(),
    y: [item.open, item.high, item.low, item.close],
  }));

  // Generate background stripes as x-axis annotations
  const annotations = {
    xaxis: data.map((item, i) => {
      const start = new Date(item.time).getTime();
      const next = data[i + 1]
        ? new Date(data[i + 1].time).getTime()
        : start + 24 * 60 * 60 * 1000; // next day fallback

      return {
        x: start,
        x2: next,
        fillColor: item.close >= item.open ? "rgba(38, 166, 154, 0.1)" : "rgba(239, 83, 80, 0.1)",
      };
    }),
  };

  const options: any = {
    chart: {
      type: "candlestick",
      height,
      background: "#ffffff",
      toolbar: {
        show: true,
      },
    },
    annotations,
    title: {
      text: "Candlestick Chart with Trend Stripes",
      align: "left",
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      tooltip: { enabled: true },
      labels: {
        formatter: (value: number) => `₹${value.toFixed(2)}`,
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
    tooltip: {
      custom: ({ seriesIndex, dataPointIndex, w }: any) => {
        const data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
        const [open, high, low, close] = data.y;
        const date = new Date(data.x).toLocaleDateString();
        const isGreen = close >= open;

        return `
          <div class="bg-white p-3 border rounded shadow-lg">
            <div class="font-semibold mb-2">${date}</div>
            <div class="space-y-1">
              <div class="text-gray-600">Open: ₹${open.toFixed(2)}</div>
              <div style="color: ${isGreen ? "#26a69a" : "#ef5350"}">
                Close: ₹${close.toFixed(2)}
              </div>
              <div class="text-gray-600">High: ₹${high.toFixed(2)}</div>
              <div class="text-gray-600">Low: ₹${low.toFixed(2)}</div>
            </div>
          </div>
        `;
      },
    },
  };

  const series = [
    {
      name: "Price",
      data: chartData,
    },
  ];

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
