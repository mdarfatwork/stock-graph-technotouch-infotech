export default function ChartLoader() {
  return (
    <div className="flex items-center justify-center w-full h-full min-h-[500px] bg-gray-50 rounded-lg">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-gray-200 rounded-full border-t-blue-500 animate-spin"></div>
        </div>
        <div className="text-sm font-medium text-gray-600">
          Loading chart...
        </div>
      </div>
    </div>
  );
}
