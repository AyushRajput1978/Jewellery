import { FaGem, FaCoins, FaTools, FaReceipt, FaPlus } from "react-icons/fa";

interface Breakdown {
  metalValue: number;
  stonesValue: number;
  makingCharges: number;
  gst: number;
  sizeAdj: number;
  caratAdj: number;
}

function formatINR(value: number) {
  return value?.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });
}

export default function PriceBreakdown({
  breakdown,
  total,
}: {
  breakdown: Breakdown;
  total: number;
}) {
  return (
    <div className="mt-6 border rounded-xl p-6 bg-gradient-to-b from-white to-gray-50 shadow-md transition hover:shadow-lg">
      <h3 className="font-semibold mb-4 text-lg flex items-center gap-2">
        <FaReceipt className="text-gray-600" /> Price Breakdown
      </h3>

      <ul className="space-y-2 text-sm">
        <li className="flex justify-between">
          <span className="flex items-center gap-2">
            <FaCoins /> Metal Value
          </span>
          <span className="font-medium">{formatINR(breakdown.metalValue)}</span>
        </li>
        <li className="flex justify-between">
          <span className="flex items-center gap-2">
            <FaGem /> Gemstones
          </span>
          <span>{formatINR(breakdown.stonesValue)}</span>
        </li>
        <li className="flex justify-between">
          <span className="flex items-center gap-2">
            <FaTools /> Making Charges (20% off)
          </span>
          <span>{formatINR(breakdown.makingCharges)}</span>
        </li>
        <li className="flex justify-between text-gray-600">
          <span className="flex items-center gap-2">
            <FaPlus /> Size Adj.
          </span>
          <span>{formatINR(breakdown.sizeAdj)}</span>
        </li>
        <li className="flex justify-between text-gray-600">
          <span className="flex items-center gap-2">
            <FaPlus /> Carat Adj.
          </span>
          <span>{formatINR(breakdown.caratAdj)}</span>
        </li>
        <li className="flex justify-between text-gray-600">
          <span className="flex items-center gap-2">
            <FaReceipt /> GST (3%)
          </span>
          <span>{formatINR(breakdown.gst)}</span>
        </li>
      </ul>

      <div className="border-t mt-4 pt-3 flex justify-between items-center">
        <span className="font-semibold text-lg">Grand Total</span>
        <span className="text-green-700 font-bold text-xl">
          {formatINR(total)}
        </span>
      </div>
    </div>
  );
}
