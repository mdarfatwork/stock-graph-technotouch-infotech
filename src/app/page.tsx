import ApexCandleChart from "@/components/ApexCandleChart";
import { data } from "@/data";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6">
      <ApexCandleChart data={data} className="w-full max-w-5xl px-5 mx-auto" />
    </main>
  );
}
