"use client";
import React, { useState } from "react";
import Image from "next/image";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
interface ProductImageGalleryProps {
  images: string[]; 
  selectedVariationImage?: string; 
}

export default function ProductImageGallery({ images, selectedVariationImage }: ProductImageGalleryProps) {
  const [mainImage, setMainImage] = useState(selectedVariationImage || images[0]);

  // Update main image when variation changes
  React.useEffect(() => {
    if (selectedVariationImage) setMainImage(selectedVariationImage);
  }, [selectedVariationImage]);

  return (
    <div>
       <Zoom>
        <div className="relative aspect-square w-full overflow-hidden rounded-xl border bg-white">
          <Image
            src={mainImage}
            alt="Product image"
            width={600}
            height={600}
            className="object-contain w-full h-full cursor-zoom-in transition-transform duration-300 hover:scale-105"
            priority
          />
        </div>
      </Zoom>
      <div className="flex gap-2 mt-4">
        {images.map((img, idx) => (
          <Image
            key={img}
            src={img}
            width={80}
            height={64}
            alt={`Thumbnail ${idx + 1}`}
            className={` object-cover border rounded cursor-pointer ${mainImage === img ? "ring-2 ring-blue-500" : ""}`}
            onClick={() => setMainImage(img)}
          />
        ))}
      </div>
    </div>
  );
}