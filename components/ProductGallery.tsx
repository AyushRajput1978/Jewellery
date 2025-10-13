"use client";
import Image from "next/image";
import { useState } from "react";

export default function ProductGallery({ images }: { images: string[] }) {
  const [main, setMain] = useState(images[0]);

  return (
    <section>
      <div className="border rounded-2xl overflow-hidden relative">
        <Image
          src={main}
          alt="Product main image"
          width={500}
          height={500}
          className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="flex gap-3 mt-3">
        {images.map((img) => (
          <button
            key={img}
            onClick={() => setMain(img)}
            className="border rounded-lg p-1"
          >
            <Image src={img} alt="Thumbnail" width={80} height={80} />
          </button>
        ))}
      </div>
    </section>
  );
}
