"use client"; // ✅ Required for Client Components in Next.js App Router

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity?: number;
}

const products: Product[] = [
  { id: 1, name: "Handcrafted Wooden Chair", price: 4999, image: "/rocking-chair.jpg" },
  { id: 2, name: "Luxury Teak Coffee Table", price: 12999, image: "/wooden-chair.jpg" },
  { id: 3, name: "Royal Rosewood Bookshelf", price: 18999, image: "/rocking-chair.jpg" },
  { id: 4, name: "Premium Oak Dining Set", price: 39999, image: "/wooden-chair.jpg" },
];

export default function ProductsPage() {
  const [cart, setCart] = useState<Product[]>([]);
  const [sortBy, setSortBy] = useState("default");
  const [addedProductId, setAddedProductId] = useState<number | null>(null);
  const [cartShake, setCartShake] = useState(false);
  const [cartVisible, setCartVisible] = useState(false);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]") as Product[];
    setCart(savedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    setAddedProductId(product.id);
    setCartShake(true);
    setTimeout(() => {
      setCartShake(false);
      setAddedProductId(null);
    }, 500);
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === productId ? { ...item, quantity: (item.quantity || 1) - 1 } : item
        )
        .filter((item) => item.quantity && item.quantity > 0)
    );
  };

  const removeItemCompletely = (productId: number) => {
    if (confirm("Are you sure you want to remove this item from the cart?")) {
      setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    }
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    return 0;
  });

  const totalPrice = cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);

  return (
    <div className="min-h-screen bg-[#F4E1C1] p-8 relative text-gray-900">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-extrabold">Premium Wooden Creations</h1>
        <button
          className={`relative bg-yellow-700 text-white px-6 py-2 rounded-lg shadow-md hover:bg-yellow-800 transition cursor-pointer ${cartShake ? 'animate-shake' : ''}`}
          onClick={() => setCartVisible(!cartVisible)}
        >
          🛒 Cart ({cart.reduce((total, item) => total + (item.quantity || 1), 0)})
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {sortedProducts.map((product) => (
          <div
            key={product.id}
            className="p-6 bg-white shadow-lg rounded-xl hover:shadow-2xl transform hover:scale-105 transition-all"
          >
            <div className="w-full h-64 flex items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
            <h2 className="text-2xl font-semibold mt-4">{product.name}</h2>
            <p className="text-lg font-semibold">₹{product.price.toLocaleString()}</p>
            {addedProductId === product.id && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="text-green-600 font-medium text-sm mt-2"
              >
                Added to cart ✅
              </motion.p>
            )}
            <button
              className="mt-4 px-6 py-3 text-white bg-yellow-700 hover:bg-yellow-800 rounded-lg font-medium transition cursor-pointer"
              onClick={() => addToCart(product)}
            >
              {addedProductId === product.id ? "Added" : "Add to Cart"}
            </button>
          </div>
        ))}
      </div>

      {cartVisible && (
        <motion.div 
          initial={{ x: 300 }} 
          animate={{ x: 0 }} 
          exit={{ x: 300 }} 
          className="fixed top-16 right-0 h-auto max-h-[80vh] w-80 bg-white shadow-2xl p-6 overflow-y-auto rounded-lg"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Your Cart</h2>
            <X className="cursor-pointer" onClick={() => setCartVisible(false)} />
          </div>
          {cart.length === 0 ? (
            <p className="text-gray-700">Your cart is empty.</p>
          ) : (
            <>
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between border-b py-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg" />
                  <div className="ml-4 flex-1">
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-gray-700">₹{item.price.toLocaleString()}</p>
                    <div className="flex items-center mt-2">
                      <button className="px-2 py-1 bg-gray-300 rounded-l" onClick={() => removeFromCart(item.id)}>-</button>
                      <span className="px-3 py-1 bg-gray-100 text-gray-900 font-bold">{item.quantity}</span>
                      <button className="px-2 py-1 bg-gray-300 rounded-r" onClick={() => addToCart(item)}>+</button>
                    </div>
                    <button className="mt-2 px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg text-sm" onClick={() => removeItemCompletely(item.id)}>Remove</button>
                  </div>
                </div>
              ))}
              <p className="text-lg font-bold mt-4">Total: ₹{totalPrice.toLocaleString()}</p>
            </>
          )}
        </motion.div>
      )}
    </div>
  );
}
