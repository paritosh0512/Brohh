import React from "react";
import product1 from "../../assets/hero/product2.png"; // Replace with actual image paths
import product2 from "../../assets/hero/product.png";
import product3 from "../../assets/hero/product1.png";
import product4 from "../../assets/hero/product2.png";

export default function Men() {
  const products = [
    {
      id: 1,
      img: product1,
      title: "Nirvana Unisex Oversized T-shirt: Serene Tranquility",
      price: "Rs. 999.00",
    },
    {
      id: 2,
      img: product2,
      title: "Giraffe Unisex Oversized T-shirt: Playful Elegance",
      price: "Rs. 999.00",
    },
    {
      id: 3,
      img: product3,
      title: "Solo Monkey Unisex Oversized T-shirt: Funky Multicolor Design",
      price: "Rs. 999.00",
    },
    {
      id: 4,
      img: product4,
      title: "Abstract Patterns T-shirt: Artistic Vibes",
      price: "Rs. 999.00",
    },
  ];

  return (
    <div className="py-8 px-4 sm:px-8 lg:px-16">
      {/* Responsive Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            {/* Product Image */}
            <div className="relative">
              <img
                src={product.img}
                alt={product.title}
                className="w-full h-60 object-cover"
              />
              <button className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-200">
                ❤️ {/* Heart Icon Placeholder */}
              </button>
            </div>

            {/* Product Details */}
            <div className="p-4">
              <h3 className="text-sm font-semibold text-gray-700">
                {product.title}
              </h3>
              <p className="mt-2 text-lg font-bold text-gray-900">
                {product.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
