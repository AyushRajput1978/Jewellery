import Image from "next/image";

export default function RelatedProducts() {
  const mock = [
    { id: 1, name: "Emerald Halo Ring", price: 18999 },
    { id: 2, name: "Ruby Solitaire Ring", price: 20999 },
    { id: 3, name: "Diamond Eternity Band", price: 23999 },
  ];

  return (
    <section>
      <h2 className="text-xl font-semibold mb-3">You May Also Like</h2>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {mock.map((p) => (
          <div
            key={p.id}
            className="min-w-[180px] bg-white p-3 rounded-lg shadow-sm"
          >
            <Image
              src={`https://via.placeholder.com/150?text=${p.name}`}
              alt={p.name}
              width={150}
              height={150}
              className="rounded-md"
            />
            <p className="mt-2 font-medium">{p.name}</p>
            <p className="text-sm text-gray-600">₹{p.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
