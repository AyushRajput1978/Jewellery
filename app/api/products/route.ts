import { NextResponse } from "next/server";
import product from "../../../data/Product.json";

export async function GET() {
  const products = [
    {
      ...product,
      id: "SR0160AQ",
      title: "Classic Aquamarine Ring",
      thumbnail: product.images[0],
      short_desc: "Elegant aquamarine and diamond three-stone design",
    },
    {
      ...product,
      id: "SR0161DM",
      title: "Premium Diamond Halo Ring",
      thumbnail: product.images[1],
      short_desc: "Brilliant diamond halo with yellow gold band",
    },
    {
      ...product,
      id: "SR0162SP",
      title: "Sapphire Crown Ring",
      thumbnail: product.images[2],
      short_desc: "Royal blue sapphire with white gold finish",
    },
  ];
  await new Promise((r) => setTimeout(r, 500));
  return NextResponse.json(products);
}
