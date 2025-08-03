# Candlestick Chart Assignment

This is a **Next.js** assignment project that displays an **interactive candlestick chart** with dynamic date/time formatting based on zoom level. Built as part of an assignment for **TechnoTouch Infotech**.

## 🚀 Features

* Candlestick chart built using **React + ApexCharts**
* **Dynamic X-axis formatting**:
  * Full zoom out → Month only (e.g., `May`)
  * Medium zoom → Day + Month (e.g., `05 May`)
  * Closer zoom → Day + Time (e.g., `05 May 10:00`)
  * Very close zoom → Time only (e.g., `10:35 AM`)
* Highlight last 10 candles as **Bull** or **Bear** with annotations
* Responsive and styled with **Tailwind CSS**

## 📊 Data Source

As per the company instructions, candlestick data can be fetched using the **Python** `tvDatafeed` library: https://github.com/dewkul/tvDatafeed

You can use this Python repo to fetch live candlestick data from TradingView.

## 🛠 Tech Stack

* **Next.js (App Router)**
* **TypeScript**
* **Tailwind CSS**
* **ApexCharts (react-apexcharts)**

## 📂 Project Setup

1. **Clone the repo**

```bash
git clone https://github.com/mdarfatwork/stock-graph-technotouch-infotech.git
cd stock-graph
```

2. **Install dependencies**

```bash
npm install
# or yarn install
# or pnpm install
```

3. **Run the development server**

```bash
npm dev
# or yarn run dev
# or pnpm dev
```

4. **Open your browser at http://localhost:3000**

---

**Built by [Mohammed Arfat](https://github.com/mdarfatwork) for TechnoTouch Infotech**.
