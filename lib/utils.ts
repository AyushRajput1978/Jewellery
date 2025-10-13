export const formatPrice = (val: number): string =>
  val.toLocaleString("en-IN", { style: "currency", currency: "INR" });
