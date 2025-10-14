"use client";
import clsx from "clsx";

export default function AddToBagButton({ disabled = false }: { disabled?: boolean }) {
  return (
    <button 
      disabled={disabled}
      className={clsx(
        "w-full py-3 mt-4 rounded-lg transition font-medium",
        disabled
          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
          : "bg-black text-white hover:bg-gray-800"
      )}
    >
      {disabled ? "Unavailable" : "Add to Bag"}
    </button>
  );
}
