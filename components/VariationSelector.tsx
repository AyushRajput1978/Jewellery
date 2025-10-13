"use client";
import { useState, useMemo } from "react";
import { calculateTotalPrice } from "@/lib/pricing";

export default function VariationSelector({
  variations,
  basePrice,
}: {
  variations: any;
  basePrice: number;
}) {
  const [selected, setSelected] = useState({
    gemstone: "Aquamarine",
    quality: "Good",
    metal: "White Gold",
    carat_weight: 1.5,
    ring_size: 7,
  });

  const total = useMemo(
    () => calculateTotalPrice(basePrice, selected),
    [selected]
  );

  const handleChange = (type: string, value: any) =>
    setSelected((prev) => ({ ...prev, [type]: value }));

  return (
    <div className="space-y-4 mt-4">
      {Object.entries(variations).map(([type, options]) => (
        <div key={type}>
          <p className="capitalize font-medium mb-1">
            {type.replace("_", " ")}
          </p>
          <select
            onChange={(e) => handleChange(type, e.target.value)}
            className="border p-2 rounded-md w-full"
          >
            {(options as any[]).map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>
      ))}

      <div className="pt-3 border-t">
        <p className="text-xl font-bold">Total: ₹{total}</p>
      </div>
    </div>
  );
}
