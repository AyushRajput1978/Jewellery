"use client";
import clsx from "clsx";

interface Props {
  variations: Record<string, string[] | number[]>;
  selected: any;
  onSelect: (s: any) => void;
  total: number;
}

export default function VariationSelector({ variations, selected, onSelect, total }: Props) {

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
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleSelect(type, option)}
                  className={clsx(
                    "px-4 py-2 rounded-lg border transition-all duration-200",
                    isActive
                      ? "bg-black text-white border-black"
                      : "bg-white text-gray-700 border-gray-300 hover:border-black"
                  )}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      <div className="pt-4 border-t">
        <p className="text-xl font-bold">
         Total: <span className="text-green-700">₹{total.toLocaleString("en-IN")}</span>
        </p>
      </div>
    </div>
  );
}
