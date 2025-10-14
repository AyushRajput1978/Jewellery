"use client";
import { useState, useMemo } from "react";
import VariationSelector from "./VariationSelector";
import PriceBreakdown from "./PriceBreakdown";
import AddToBagButton from "./AddToBagButton";
import { calculateUnifiedPricing } from "@/lib/pricing";
import { checkAvailability } from "@/lib/availability";

export default function ProductInfo({ product }: { product: any }) {
  const [selected, setSelected] = useState({
    gemstone: "Aquamarine",
    quality: "Good",
    metal: "White Gold",
    carat_weight: 1.5,
    ring_size: 7,
  });

  const { total, breakdown } = useMemo(
    () =>
      calculateUnifiedPricing(
        product.price_breakdown,
        selected,
        product.base_price
      ),
    [selected, product]
  );

  // Check availability for current selection
  const availabilityResult = useMemo(() => {
    if (product.availability) {
      return checkAvailability(selected, product.availability);
    }
    return {
      status: "in_stock" as const,
      message: "In stock - ready to ship",
      isAvailable: true,
    };
  }, [selected, product.availability]);

  return (
    <section>
      <h1 className="text-2xl font-semibold">{product.title}</h1>
      <p className="text-sm text-gray-500">⭐ {product.reviews} Reviews</p>
      <p className="text-green-700 mt-1">{product.exclusive_offer}</p>

      <VariationSelector
        variations={product.variations}
        selected={selected}
        onSelect={setSelected}
        total={total}
        availability={product.availability}
        availabilityStatus={{
          status: availabilityResult.status,
          message: availabilityResult.message,
        }}
      />

      <PriceBreakdown breakdown={breakdown} total={total} />
      <AddToBagButton disabled={!availabilityResult.isAvailable} />
    </section>
  );
}
