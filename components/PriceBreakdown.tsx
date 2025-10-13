interface BreakdownProps {
  breakdown: any;
}

export default function PriceBreakdown({ breakdown }: BreakdownProps) {
  const { metal, stones, making_charges } = breakdown;

  return (
    <div className="mt-4 border rounded-xl p-4 bg-white shadow-sm">
      <h3 className="font-semibold mb-3">Price Breakdown</h3>
      <ul className="space-y-1 text-sm">
        <li>Metal Value: ₹{metal.value}</li>
        {stones.map((s: any) => (
          <li key={s.type}>
            {s.type}: ₹{s.value}
          </li>
        ))}
        <li>Making Charges: ₹{making_charges}</li>
        <li>GST (3%): Auto applied</li>
      </ul>
    </div>
  );
}
