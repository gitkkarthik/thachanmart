"use client";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const productImages = Array.from({ length: 5 }).map((_, i) => `/products/image-${i + 1}.jpg`);

export default function ProductCarousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="p-4">
      <Slider {...settings}>
        {productImages.map((src, index) => (
          <div key={index} className="relative w-full h-60">
            <Image 
              src={src} 
              alt={`Product ${index + 1}`} 
              fill
              className="object-cover rounded-lg shadow-md"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
