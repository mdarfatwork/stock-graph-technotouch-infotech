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
  const chartData = data.map((item) => ({
    x: new Date(item.time).getTime(),
    y: [item.open, item.high, item.low, item.close],
  }));

  const options = {
    chart: {
      type: "candlestick" as const,
      height: height,
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true,
        },
      },
      background: "#ffffff",
    },
    title: {
      text: "Candlestick Chart",
      align: "left" as const,
      style: {
        fontSize: "16px",
        fontWeight: 600,
        color: "#333",
      },
    },
    xaxis: {
      type: "datetime" as const,
      labels: {
        style: {
          colors: "#666",
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
      labels: {
        style: {
          colors: "#666",
          fontSize: "12px",
        },
        formatter: (value: number) => `₹${value.toFixed(2)}`,
      },
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: "#26a69a",
          downward: "#ef5350",
        },
        wick: {
          useFillColor: true,
        },
      },
    },
    grid: {
      borderColor: "#f0f0f0",
      strokeDashArray: 3,
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
