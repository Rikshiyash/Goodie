"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const RestaurantLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');
  const [error, seterror] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault(); // stop page reload

    if (!email || !password) {
      seterror(true);
      return;
    } else {
      seterror(false);
    }

    let response = await fetch("http://localhost:3000/api/restaurant", {
      method: "POST",
      headers: { "Content-Type": "application/json" }, // ADD HEADERS
      body: JSON.stringify({ email, password, login: true }),
    });

    response = await response.json();

    if (response.success && response.result) {
      localStorage.setItem("restaurantUser", JSON.stringify(response.result));
      router.push("/restaurant/dashboard");
    } else {
      alert("Invalid login credentials");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-2xl font-bold text-center mb-6">Restaurant Login</h2>
      <form className="space-y-4" onSubmit={handleLogin}>
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && !email && (
            <span className="text-red-500 text-sm">enter the email</span>
          )}
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
          {error && !password && (
            <span className="text-red-500 text-sm">enter the password</span>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-red-500 text-white font-semibold py-2 rounded-lg hover:bg-red-600 transition-all duration-300"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default RestaurantLogin;
