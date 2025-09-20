"use client";

import React, { useState, useEffect } from "react";
import CustomerHeader from "@/app/_components/CustomeHeader";
import CustomerFooter from "@/app/_components/CustomerFooter";
import { Delivery, TAX } from "../lib/constant";
import { useRouter } from "next/navigation";

export default function Page() {
  const [userStorage, setUserStorage] = useState(null);
  const [cartStorage, setCartStorage] = useState([]);
  const [removeCartdata, setRemoveCartdata] = useState(false);
  const router = useRouter();

  const Total = cartStorage.reduce((sum, item) => sum + item.price, 0);

  // Load cart & user data from localStorage (browser only)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) setUserStorage(JSON.parse(storedUser));

      const storedCart = localStorage.getItem("cart");
      if (storedCart) setCartStorage(JSON.parse(storedCart));
    }
  }, []);

  const orderNow = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    let city = JSON.parse(localStorage.getItem("user")).city;
        let deliveryBoyresponse = await fetch('http://localhost:3000/api/deliveryboy/'+city);
        deliveryBoyresponse = await deliveryBoyresponse.json();
        let deliveryboyIds = deliveryBoyresponse.result.map((item)=>item._id)
        let deliveryBoy_ID = deliveryboyIds[Math.floor(Math.random()*deliveryboyIds.length)]
        console.log(deliveryBoy_ID)
        if(!deliveryBoy_ID){
          alert("Delivery partner not available");
          return false;
        }
    const cart = JSON.parse(localStorage.getItem("cart"));
    if (!user || !cart) return alert("User or cart not found");

    let collection = {
      user_ID: user._id,
      resto_ID: cart[0]?.resto_id,
      foodItmIDS: cart.map((item) => item._id).toString(),
      deliveryBoy_ID,
      status: "confirm",
      amount: Total,
    };

    let response = await fetch("http://localhost:3000/api/order", {
      method: "POST",
      body: JSON.stringify(collection),
    });

    response = await response.json();
    if (response.success) {
      alert("order confirmed");
      setRemoveCartdata(true);
      localStorage.removeItem("cart"); // ✅ Clear cart after order
      router.push("/myProfile");
    } else {
      alert("order failed");
    }
  };

  const removeFromCart = (id) => {
    const updatedCart = cartStorage.filter((item) => item._id !== id);
    setCartStorage(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <CustomerHeader removeCartData={removeCartdata} />

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white shadow-lg rounded-2xl p-8 max-w-2xl mx-auto space-y-8">
          {/* User Details */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
              User Details
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Name</span>
                <span className="font-medium text-gray-900">
                  {userStorage?.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Address</span>
                <span className="font-medium text-gray-900">
                  {userStorage?.address}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">City</span>
                <span className="font-medium text-gray-900">
                  {userStorage?.city}
                </span>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
              Order Summary
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Food Charges</span>
                <span className="font-medium text-gray-900">₹{Total}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium text-gray-900">
                  ₹{(Total * TAX) / 100}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Fees</span>
                <span className="font-medium text-gray-900">₹{Delivery}</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t pt-3">
                <span>Total Amount</span>
                <span className="text-green-600">
                  ₹{Total + (Total * TAX) / 100 + Delivery}
                </span>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
              Payment Method
            </h2>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Cash on Delivery</span>
              <span className="text-green-600 font-semibold">
                ₹{Total + (Total * TAX) / 100 + Delivery + 10}
              </span>
            </div>
          </div>

          <button
            onClick={orderNow}
            className="w-full mt-6 bg-orange-500 text-white py-3 rounded-xl shadow hover:bg-orange-600 transition"
          >
            Place your order
          </button>
        </div>
      </div>

      <CustomerFooter />
    </div>
  );
}
