import { NextResponse } from "next/server";
import product from "../../../../data/Product.json";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params; // ✅ must await the async params

  await new Promise((r) => setTimeout(r, 600)); // simulate latency
  return NextResponse.json({ ...product, id });
}
