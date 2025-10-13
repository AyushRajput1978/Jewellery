"use client";

import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Product Page Error:", error);
  }, [error]);

  return (
    <main className="flex flex-col items-center justify-center h-[70vh] text-center p-6">
      <h1 className="text-3xl font-semibold text-red-600 mb-4">
        Oops! Something went wrong 😔
      </h1>
      <p className="text-gray-600 mb-6 max-w-md">
        We couldn’t load the product details right now. This may be due to a
        network issue or missing data.
      </p>

      <button
        onClick={() => reset()}
        className="px-5 py-2.5 bg-black text-white rounded-lg hover:bg-gray-800 transition"
      >
        Retry
      </button>
    </main>
  );
}
