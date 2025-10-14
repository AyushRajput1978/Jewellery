import {
  gemstoneMultiplier,
  qualityMultiplier,
  metalMultiplier,
} from "./multipliers";

/**
 * Unified pricing logic for both VariationSelector and PriceBreakdown
 * Ensures consistent total and breakdown calculations.
 */
export function calculateUnifiedPricing(
  priceBreakdown: any,
  selected: any,
  basePrice: number
) {
  const { gemstone, quality, metal, carat_weight, ring_size } = selected;

  // multipliers
  const gemstoneM = gemstoneMultiplier[gemstone] || 1;
  const qualityM = qualityMultiplier[quality] || 1;
  const metalM = metalMultiplier[metal] || 1;

  // base components (derived from basePrice instead of individual values)
  const makingChargesRaw = priceBreakdown.making_charges;
  const makingCharges = makingChargesRaw * 0.8; // 20% off

  const metalValue = priceBreakdown.metal.value * metalM;
  const stonesValue =
    priceBreakdown.stones.reduce(
      (acc: number, s: any) => acc + s.value,
      0
    ) *
    gemstoneM *
    qualityM;

  // Use unified subtotal
  const baseSubtotal = metalValue + stonesValue + makingCharges;

  // Adjustments
  const sizeAdj = ring_size > 7 ? (ring_size - 7) * 500 : 0;
  const caratAdj = carat_weight > 1.5 ? (carat_weight - 1.5) * 1000 : 0;

  // Apply GST on subtotal + adjustments
  const gst = Math.round((baseSubtotal + sizeAdj + caratAdj) * 0.03);

  // Final total
  const total = Math.round(baseSubtotal + gst + sizeAdj + caratAdj);

  return {
    total,
    breakdown: {
      metalValue,
      stonesValue,
      makingCharges,
      gst,
      sizeAdj,
      caratAdj,
    },
  };
}
