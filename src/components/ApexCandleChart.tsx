"use client";

import React from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import ChartLoader from "./ChartLoader";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
  loading: () => <ChartLoader />,
});

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

interface FormatterOptions {
  w?: {
    globals?: {
      maxX?: number;
      minX?: number;
    };
  };
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

  const categories = data.map((item) => {
    const date = new Date(item.time);
    return isNaN(date.getTime()) ? item.time : date.toISOString();
  });

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
      zoom: {
        enabled: true,
        type: "x",
        autoScaleYaxis: true,
      },
    },
    title: {
      text: "Candlestick Chart",
      align: "left",
      style: {
        fontSize: "18px",
        fontWeight: "600",
        color: "#333",
      },
    },
    xaxis: {
      type: "numeric",
      tickPlacement: "on",
      labels: {
        rotateAlways: false,
        hideOverlappingLabels: true,
        style: {
          colors: "#666",
          fontSize: "12px",
          fontWeight: "500",
        },
        formatter: (value: string, _?: number, opts?: FormatterOptions) => {
          const index = parseInt(value);
          if (isNaN(index) || index < 0 || index >= categories.length)
            return "";

          const date = new Date(categories[index]);
          if (isNaN(date.getTime())) return "";

          const maxX = opts?.w?.globals?.maxX ?? data.length;
          const minX = opts?.w?.globals?.minX ?? 0;
          const visibleRange = maxX - minX;
          const zoomLevel = visibleRange / data.length;

          if (zoomLevel > 0.8) {
            return date.toLocaleDateString("en-US", { month: "short" });
          } else if (zoomLevel > 0.4) {
            return date.toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
            });
          } else if (zoomLevel > 0.1) {
            return `${date.toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
            })} ${date.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}`;
          } else {
            return date.toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            });
          }
        },
      },
      tooltip: { enabled: false },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#666",
          fontSize: "12px",
          fontWeight: "500",
        },
        formatter: (value) => `₹${value.toFixed(2)}`,
      },
      title: {
        text: "Price (₹)",
        style: {
          color: "#666",
          fontSize: "14px",
          fontWeight: "600",
        },
      },
    },
    tooltip: {
      shared: false,
      custom: ({ seriesIndex, dataPointIndex, w }) => {
        const dataPoint =
          w.globals.initialSeries[seriesIndex].data[dataPointIndex];
        const [open, high, low, close] = dataPoint.y;
        const candle = data[dataPointIndex];
        const date = new Date(candle.time);

        const dateTimeString = `${date.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })} ${date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}`;

        const changePercent = (((close - open) / open) * 100).toFixed(2);
        const changeColor = close >= open ? "#26a69a" : "#ef5350";

        return `
          <div style="background: white; padding: 12px; border: 1px solid #e0e0e0; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
            <div style="font-weight: 600; margin-bottom: 8px; color: #333; font-size: 13px;">${dateTimeString}</div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px; font-size: 12px;">
              <div style="color: #666;">Open: <span style="color: #333; font-weight: 500;">₹${open.toFixed(
                2
              )}</span></div>
              <div style="color: #666;">High: <span style="color: #333; font-weight: 500;">₹${high.toFixed(
                2
              )}</span></div>
              <div style="color: #666;">Low: <span style="color: #333; font-weight: 500;">₹${low.toFixed(
                2
              )}</span></div>
              <div style="color: #666;">Close: <span style="color: #333; font-weight: 500;">₹${close.toFixed(
                2
              )}</span></div>
            </div>
            <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #f0f0f0; font-size: 12px;">
              <span style="color: #666;">Change: </span>
              <span style="color: ${changeColor}; font-weight: 600;">${changePercent}%</span>
            </div>
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
        wick: {
          useFillColor: true,
        },
      },
    },
    grid: {
      borderColor: "#f0f0f0",
      strokeDashArray: 2,
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    annotations,
    responsive: [
      {
        breakpoint: 768,
        options: {
          xaxis: {
            labels: {
              style: {
                fontSize: "10px",
              },
            },
          },
          yaxis: {
            labels: {
              style: {
                fontSize: "10px",
              },
            },
          },
        },
      },
    ],
  };

  const lineSeries = data.map((item, index) => ({
    x: index,
    y: item.close,
  }));

  const series = [
    {
      name: "OHLC",
      data: chartData,
    },
    {
      name: "Trend",
      type: "line",
      data: lineSeries,
      color: "#2196f3",
      strokeWidth: 2,
    },
  ];

  return (
    <div
      className={`apex-candlestick-chart ${className}`}
      style={{ position: "relative" }}
    >
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
