"use client";
import Image from "next/image";

const productImages = Array.from({ length: 25 }).map((_, i) => `/products/image-${i + 1}.jpg`);

export default function ProductGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
      {productImages.map((src, index) => (
        <div key={index} className="relative w-full h-48">
          <Image 
            src={src} 
            alt={`Product ${index + 1}`} 
            fill
            className="object-cover rounded-lg shadow-md"
          />
        </div>
      ))}
    </div>
  );
}
