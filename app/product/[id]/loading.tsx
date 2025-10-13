export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-gray-200 h-[500px] rounded-xl" />
        <div className="space-y-4">
          <div className="h-8 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
          <div className="h-4 bg-gray-200 rounded w-2/3" />
          <div className="h-10 bg-gray-200 rounded w-full mt-8" />
        </div>
      </div>
    </div>
  );
}
