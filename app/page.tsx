import Image from "next/image";
import Link from "next/link";
import product from "../data/Product.json";

// interface Product {
//   id: string;
//   title: string;
//   thumbnail: string;
//   short_desc: string;
//   base_price: number;
//   exclusive_offer?: string;
// }

// async function getProducts(): Promise<Product[]> {
//   const res = await fetch(
//     `${
//       process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
//     }/api/products`,
//     {
//       next: { revalidate: 60 },
//     }
//   );
//   if (!res.ok) throw new Error("Failed to fetch products");
//   return res.json();
// }

export default async function HomePage() {
  // const products = await getProducts();
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
  console.log(products, "producttss");

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-semibold mb-8">Jewelry Collection</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((p) => (
          <Link
            key={p.id}
            href={`/product/${p.id}`}
            className="group bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden"
          >
            <Image
              src={p.thumbnail}
              alt={p.title}
              width={400}
              height={400}
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="p-4 space-y-1">
              <h2 className="text-lg font-medium">{p.title}</h2>
              <p className="text-sm text-gray-500 line-clamp-2">
                {p.short_desc}
              </p>
              {p.exclusive_offer && (
                <p className="text-xs text-green-600 font-medium">
                  {p.exclusive_offer}
                </p>
              )}
              <p className="text-base font-semibold text-gray-800">
                ₹{p.base_price.toLocaleString("en-IN")}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
