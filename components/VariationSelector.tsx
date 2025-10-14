"use client";
import clsx from "clsx";
import { checkOptionAvailability, AvailabilityData } from "@/lib/availability";

interface Props {
  variations: Record<string, string[] | number[]>;
  selected: any;
  onSelect: (s: any) => void;
  total: number;
  availability?: AvailabilityData;
  availabilityStatus?: {
    status: "in_stock" | "backorder" | "out_of_stock";
    message: string;
  };
}

export default function VariationSelector({ 
  variations, 
  selected, 
  onSelect, 
  total,
  availability,
  availabilityStatus
}: Props) {

  const handleSelect = (type: string, value: string | number) => {
    onSelect({ ...selected, [type]: value });
  };

  return (
    <div className="space-y-6 mt-6">
      {Object.entries(variations).map(([type, options]) => (
        <div key={type}>
          <p className="capitalize font-medium mb-2">{type.replace("_", " ")}</p>
          <div className="flex flex-wrap gap-2">
            {(options as (string | number)[]).map((option) => {
              const isActive = selected[type as keyof typeof selected] === option;
              const optionAvailability = availability 
                ? checkOptionAvailability(type, option, selected, availability)
                : { isAvailable: true };
              const isDisabled = !optionAvailability.isAvailable;

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => !isDisabled && handleSelect(type, option)}
                  disabled={isDisabled}
                  title={isDisabled ? optionAvailability.reason : undefined}
                  className={clsx(
                    "px-4 py-2 rounded-lg border transition-all duration-200 relative",
                    isActive
                      ? "bg-black text-white border-black"
                      : "bg-white text-gray-700 border-gray-300 hover:border-black",
                    isDisabled && "opacity-40 cursor-not-allowed hover:border-gray-300"
                  )}
                >
                  {option}
                  {isDisabled && (
                    <span className="absolute -top-1 -right-1 text-xs bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center">
                      ✕
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {/* Availability Status Message */}
      {availabilityStatus && (
        <div className={clsx(
          "p-4 rounded-lg border",
          availabilityStatus.status === "in_stock" && "bg-green-50 border-green-200 text-green-800",
          availabilityStatus.status === "backorder" && "bg-yellow-50 border-yellow-200 text-yellow-800",
          availabilityStatus.status === "out_of_stock" && "bg-red-50 border-red-200 text-red-800"
        )}>
          <div className="flex items-start gap-2">
            <span className="text-lg">
              {availabilityStatus.status === "in_stock" && "✓"}
              {availabilityStatus.status === "backorder" && "⏱"}
              {availabilityStatus.status === "out_of_stock" && "✕"}
            </span>
            <div>
              <p className="font-medium">
                {availabilityStatus.status === "in_stock" && "In Stock"}
                {availabilityStatus.status === "backorder" && "Available on Backorder"}
                {availabilityStatus.status === "out_of_stock" && "Out of Stock"}
              </p>
              <p className="text-sm">{availabilityStatus.message}</p>
            </div>
          </div>
        </div>
      )}

      <div className="pt-4 border-t">
        <p className="text-xl font-bold">
         Total: <span className="text-green-700">₹{total.toLocaleString("en-IN")}</span>
        </p>
      </div>
    </div>
  );
}
