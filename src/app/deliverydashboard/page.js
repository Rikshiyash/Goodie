"use client";

import React, { useEffect, useState } from "react";
import DeliveryHeader from "@/app/_components/DeliveryHeader";
import { useRouter } from "next/navigation";

const DeliveryDashboard = () => {
  const router = useRouter();
  const [myOrder, setMyOrder] = useState([]);

  useEffect(() => {
    const deliveryData = JSON.parse(localStorage.getItem("deliveryboy"));

    // ✅ redirect if no deliveryboy in storage
    if (!deliveryData) {
      router.push("/deliveryBoy");
      return;
    }

    getMyOrders(deliveryData._id);
  }, []);

  const getMyOrders = async (deliveryBoyId) => {
    try {
      let response = await fetch(
        `http://localhost:3000/api/deliveryboy/order/${deliveryBoyId}`
      );
      response = await response.json();

      if (response.success) {
        setMyOrder(response.result);
      } else {
        console.error("Failed to fetch orders:", response);
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <DeliveryHeader />

      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">
          Welcome to Delivery Dashboard
        </h1>

        {myOrder.length > 0 ? (
          <div className="space-y-4">
            {myOrder.map((order, index) => (
              <div
                key={index}
                className="p-4 bg-white shadow-md rounded-lg border"
              >
                <h2 className="text-lg font-semibold">Order #{order._id}</h2>
                <p>Status: {order.status}</p>
                <p>Amount: ₹{order.amount}</p>
                <p>Restaurant: {order.resto?.name || "N/A"}</p>
                <p>User: {order.user?.name || "N/A"}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No orders assigned yet.</p>
        )}
      </div>
    </div>
  );
};

export default DeliveryDashboard;
