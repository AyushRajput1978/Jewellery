"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

interface ProductImageGalleryProps {
  images: string[];
  selectedVariationImage?: string;
}

export default function ProductImageGallery({
  images,
  selectedVariationImage,
}: ProductImageGalleryProps) {
  const [mainImage, setMainImage] = useState(
    selectedVariationImage || images[0]
  );

  useEffect(() => {
    if (selectedVariationImage) setMainImage(selectedVariationImage);
  }, [selectedVariationImage]);

  const fallbackImage =
    "https://via.placeholder.com/600/000000/FFFFFF?text=Product+Image";

  return (
    <div className="w-full">
      <Zoom>
        <div
          className="relative sm:w-3/4  md:w-full overflow-hidden rounded-xl border bg-gray-100"
          style={{ aspectRatio: "1 / 1", minHeight: "300px" }}
        >
          <Image
            src={mainImage || fallbackImage}
            alt="Product image"
            width={600}
            height={600}
            className="w-full h-full object-contain cursor-zoom-in transition-transform duration-300 hover:scale-105"
            priority={true}
          />
        </div>
      </Zoom>

      <div className="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {images.map((img, idx) => (
          <div
            key={`${img}-${idx}`}
            className={`relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 overflow-hidden border rounded-lg cursor-pointer transition-all ${
              mainImage === img ? "ring-2 ring-blue-500" : ""
            }`}
            onClick={() => setMainImage(img)}
          >
            <Image
              src={img || fallbackImage}
              alt={`Thumbnail ${idx + 1}`}
              width={80}
              height={80}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = fallbackImage;
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
