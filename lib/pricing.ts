import {
  gemstoneMultiplier,
  qualityMultiplier,
  metalMultiplier,
} from "./multipliers";

export function calculateTotalPrice(basePrice: number, selected: any): number {
  const { gemstone, quality, metal, carat_weight, ring_size } = selected;

  const gemstoneM = gemstoneMultiplier[gemstone] || 1;
  const qualityM = qualityMultiplier[quality] || 1;
  const metalM = metalMultiplier[metal] || 1;

  const base = basePrice * gemstoneM * qualityM * metalM;
  const gst = base * 0.03;

  const sizeAdj = ring_size > 7 ? (ring_size - 7) * 500 : 0;
  const caratAdj = carat_weight > 1.5 ? (carat_weight - 1.5) * 1000 : 0;

  return Math.round(base + gst + sizeAdj + caratAdj);
}
