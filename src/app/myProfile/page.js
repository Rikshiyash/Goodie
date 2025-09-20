"use client";

import React, { useEffect, useState } from "react";

export default function MyProfile() {
  const [myorders, setMyorders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // ✅ get logged-in user from localStorage
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user?._id) {
          setLoading(false);
          return;
        }

        // ✅ fetch orders for this user
        const res = await fetch(`/api/order?id=${user._id}`);
        const data = await res.json();

        if (data.success) {
          // ✅ deduplicate restaurants by _id
          const uniqueOrders = data.result.filter(
            (value, index, self) =>
              index === self.findIndex((t) => t.data._id === value.data._id)
          );
          setMyorders(uniqueOrders);
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center mt-10">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (myorders.length === 0) {
    return (
      <div className="flex justify-center mt-10">
        <p className="text-gray-600">No orders found</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center text-red-600">
        My Profile – Restaurants Ordered From
      </h2>

      <div className="grid gap-6 sm:grid-cols-2">
        {myorders.map((item) => (
          <div
            key={item.data._id}
            className="p-5 border rounded-2xl shadow-md bg-white hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold text-gray-800">
              {item.data.name}
            </h3>
            <p className="text-gray-600">{item.data.city}</p>
            <p className="text-gray-600">{item.data.address}</p>
            <p className="text-gray-600">📞 {item.data.contact}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
