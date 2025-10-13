import VariationSelector from "./VariationSelector";
import AddToBagButton from "./AddToBagButton";

interface ProductProps {
  product: any;
}

export default function ProductInfo({ product }: ProductProps) {
  return (
    <section>
      <h1 className="text-2xl font-semibold">{product.title}</h1>
      <p className="text-sm text-gray-500">⭐ {product.reviews} Reviews</p>

      <p className="text-green-700 mt-1">{product.exclusive_offer}</p>
      <VariationSelector
        variations={product.variations}
        basePrice={product.base_price}
      />
      <AddToBagButton />
    </section>
  );
}
