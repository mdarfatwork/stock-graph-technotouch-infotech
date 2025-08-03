import ApexCandleChart from "@/components/ApexCandleChart";
import { data } from "@/data";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen p-6">
      <div className="flex flex-col items-center justify-center flex-1">
        <ApexCandleChart
          data={data}
          className="w-full max-w-5xl px-5 mx-auto"
        />
      </div>

      <footer className="py-4 mt-6 text-sm text-center text-gray-600 border-t border-gray-200">
        <p>
          Built by{" "}
          <a
            href="https://github.com/mdarfatwork"
            target="_blank"
            className="font-medium text-blue-600 hover:underline"
          >
            Mohammed Arfat
          </a>{" "}
          for TechnoTouch Infotech
        </p>
      </footer>
    </main>
  );
}
