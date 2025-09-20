"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const DeliveryHeader = () => {
  const router = useRouter();

  const logout = () => {
    // ✅ remove storage (check your login sets this key)
    localStorage.removeItem("deliveryboy");

    // ✅ redirect to deliveryBoy login page
    router.push("/deliveryBoy");
  };

  return (
    <header className="w-full bg-yellow-400 text-white shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold">🚚 FastDelivery</span>
        </div>

        {/* Navigation */}
        <nav className="flex gap-6 items-center">
          <Link href="/" className="hover:text-gray-200 transition">
            Home
          </Link>
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
};

export default DeliveryHeader;
