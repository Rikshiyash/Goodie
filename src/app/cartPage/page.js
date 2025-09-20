"use client";

import React, { useState, useEffect , useMemo} from "react";
import CustomerHeader from "@/app/_components/CustomeHeader";
import CustomerFooter from "@/app/_components/CustomerFooter";
import { Delivery, TAX } from "../lib/constant";
import { useRouter } from "next/navigation";


export default function Page() {
  const [cartstorage, setCartStorage] = useState([]);
   const Total = cartstorage.reduce((sum, item) => sum + item.price, 0);
   const router = useRouter()

  // Load cart from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        setCartStorage(JSON.parse(storedCart));
      }
    }
  }, []);

  // Remove item
  const removeFromCart = (id) => {
    const updatedCart = cartstorage.filter((item) => item._id !== id);
    setCartStorage(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };
  const orderNow=()=>{
    if(JSON.parse(localStorage.getItem('user'))){
router.push("/order")
    }else{
      router.push("/userAuth?order=true")
    }

  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <CustomerHeader />

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-6">
        {cartstorage.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">
            Your cart is empty
          </p>
        ) : (
          <div className="space-y-4">
            {cartstorage.map((item) => (
              <div
                key={item._id}
                className="flex items-center border-b border-yellow-500 pb-3"
              >
                {/* Image */}
                <img
                  src={item.path}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-md"
                />

                {/* Details */}
                <div className="flex-1 ml-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-500">{item.description}</p>

                  {/* Styled price like Swiggy */}
                  <p className="text-lg font-bold text-gray-900">
                    ₹{item.price}
                  </p>

                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="mt-2 bg-orange-500 text-white px-3 py-1 rounded-lg shadow hover:bg-orange-600 transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
     <div className="container mx-auto px-4 py-6">
  <div className="bg-white shadow-lg rounded-xl p-6 max-w-md mx-auto">
    <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h2>

    <div className="flex justify-between py-2 border-b border-gray-200">
      <span className="text-gray-600">Food Charges</span>
      <span className="font-semibold text-gray-800">₹{Total}</span>
    </div>

    <div className="flex justify-between py-2 border-b border-gray-200">
      <span className="text-gray-600">Tax</span>
      <span className="font-semibold text-gray-800">{Total*TAX/100}</span>
    </div>

    <div className="flex justify-between py-2 border-b border-gray-200">
      <span className="text-gray-600">Delivery Fees</span>
      <span className="font-semibold text-gray-800">{Delivery}</span>
    </div>

    <div className="flex justify-between py-2 mt-4 text-lg font-bold">
      <span>Total Amount</span>
      <span className="text-green-600">{Total+(Total*TAX/100)+Delivery}</span>
    </div>

    <button onClick={orderNow} className="w-full mt-6 bg-orange-500 text-white py-3 rounded-lg shadow hover:bg-orange-600 transition">
      Place your Order
    </button>
  </div>
</div>


      {/* Footer */}
      <CustomerFooter />
    </div>
  );
}
