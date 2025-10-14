"use client";
import { useState, useMemo } from "react";
import VariationSelector from "./VariationSelector";
import PriceBreakdown from "./PriceBreakdown";
import AddToBagButton from "./AddToBagButton";
import { calculateUnifiedPricing } from "@/lib/pricing";

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
      />

      <PriceBreakdown breakdown={breakdown} total={total} />
      <AddToBagButton />
    </section>
  );
}
