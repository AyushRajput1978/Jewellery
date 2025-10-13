import { Metadata } from "next";
import ProductGallery from "@/components/ProductGallery";
import ProductInfo from "@/components/ProductInfo";
import PriceBreakdown from "@/components/PriceBreakdown";
import RelatedProducts from "@/components/RelatedProducts";

async function getProduct(id: string) {
  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
    }/api/product/${id}`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) throw new Error("Failed to load product");
  return res.json();
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const awaitedParams = await params;
  const p = await getProduct(awaitedParams.id);
  return {
    title: `${p.title} | Jewelry Store`,
    description: `Buy ${p.title} at the best price`,
  };
}

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const awaitedParams = await params;
  const product = await getProduct(awaitedParams.id);

  return (
    <main className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-10">
      <ProductGallery images={product.images} />
      <div className="flex flex-col gap-6">
        <ProductInfo product={product} />
        <PriceBreakdown breakdown={product.price_breakdown} />
      </div>
      <div className="col-span-2 mt-12">
        <RelatedProducts />
      </div>
    </main>
  );
}
