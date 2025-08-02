import ApexCandleChart from "@/components/ApexCandleChart";
// import RechartsCandleChart from "@/components/CandleChart";
import { dummyHdfcCandleData } from "@/data";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-2xl mb-4">
        HDFC Stock pricses in July 2025
      </h1>
      {/* <RechartsCandleChart data={dummyHdfcCandleData} className="w-full mx-auto max-w-5xl px-5" /> */}

      <ApexCandleChart data={dummyHdfcCandleData} className="w-full mx-auto max-w-5xl px-5" />
    </main>
  );
}
