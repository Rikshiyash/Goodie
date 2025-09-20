"use client";

import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const RestaurantHeader = () => {
  const [details, setDetails] = useState(null);
  const pathName = usePathname();
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem('restaurantUser');
    router.push('/');
  };

  useEffect(() => {
    const data = localStorage.getItem("restaurantUser");
    const parsed = data ? JSON.parse(data) : null;

    if (parsed && pathName === "/restaurant") {
      router.push("/restaurant/dashboard");
    } else if (!parsed && pathName === "/restaurant/dashboard") {
      router.push("/restaurant");
    }

    setDetails(parsed);
  }, [pathName, router]);

  return (
    <header className="bg-red-600 text-white shadow-md py-4 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">🍽️ FoodEase</h1>
        <nav className="space-x-6">
          <a href="/" className="hover:underline">Home</a>
          {details?.name ? (
            <>
              <button onClick={logout} className="hover:underline">Logout</button>
              <button className="hover:underline">Profile</button>
            </>
          ) : (
            <a href="/restaurant" className="hover:underline">Login / Signup</a>
          )}
        </nav>
      </div>
    </header>
  );
};

export default RestaurantHeader;
