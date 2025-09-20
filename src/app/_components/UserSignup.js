"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const UserSignup = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderRedirect = searchParams.get("order"); // ✅ check ?order=true

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [c_password, setC_password] = useState("");
  const [city, setCity] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState(false);
  const [passerror, setPasserror] = useState(false);

  const handleSubmit = async () => {
    // ✅ validate password match
    if (password !== c_password) {
      setPasserror(true);
      return;
    }
    setPasserror(false);

    // ✅ validate required fields
    if (!name || !email || !password || !c_password || !city || !mobile || !address) {
      setError(true);
      return;
    }
    setError(false);

    // ✅ call API
    let response = await fetch("http://localhost:3000/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, city, mobile, address }),
    });

    response = await response.json();

    if (response.success) {
      alert("User signup done");
      const { result } = response;
      if (result?.password) delete result.password; // don’t store password

      // ✅ save user
      localStorage.setItem("user", JSON.stringify(result));

      // ✅ clear cart
    

      // ✅ redirect
      if (orderRedirect) {
        router.push("/order");
      } else {
        router.push("/");
      }
    } else {
      alert("Signup failed");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-12 bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-3xl font-bold text-center mb-6 text-red-600">User Signup</h2>
      <div className="space-y-4">
        {/* Name */}
        <div>
          <label className="block font-semibold mb-1">Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full px-4 py-2 border rounded-lg"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {error && !name && <span className="text-red-500 text-sm">Enter your name</span>}
        </div>

        {/* Email */}
        <div>
          <label className="block font-semibold mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && !email && <span className="text-red-500 text-sm">Enter your email</span>}
        </div>

        {/* Password */}
        <div>
          <label className="block font-semibold mb-1">Password</label>
          <input
            type="password"
            placeholder="Enter password"
            className="w-full px-4 py-2 border rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && !password && <span className="text-red-500 text-sm">Enter password</span>}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block font-semibold mb-1">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm password"
            className="w-full px-4 py-2 border rounded-lg"
            value={c_password}
            onChange={(e) => setC_password(e.target.value)}
          />
          {error && !c_password && (
            <span className="text-red-500 text-sm">Confirm your password</span>
          )}
          {passerror && <span className="text-red-500 text-sm">Passwords do not match</span>}
        </div>

        {/* Address */}
        <div>
          <label className="block font-semibold mb-1">Address</label>
          <input
            type="text"
            placeholder="Enter your address"
            className="w-full px-4 py-2 border rounded-lg"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          {error && !address && <span className="text-red-500 text-sm">Enter your address</span>}
        </div>

        {/* City */}
        <div>
          <label className="block font-semibold mb-1">City</label>
          <input
            type="text"
            placeholder="Enter your city"
            className="w-full px-4 py-2 border rounded-lg"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          {error && !city && <span className="text-red-500 text-sm">Enter your city</span>}
        </div>

        {/* Mobile */}
        <div>
          <label className="block font-semibold mb-1">Mobile</label>
          <input
            type="tel"
            placeholder="Enter mobile number"
            className="w-full px-4 py-2 border rounded-lg"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
          {error && !mobile && <span className="text-red-500 text-sm">Enter mobile number</span>}
        </div>

        {/* Submit Button */}
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full bg-orange-400 text-white font-semibold py-2 rounded-lg hover:bg-orange-500 transition-all"
        >
          Signup
        </button>
      </div>
    </div>
  );
};

export default UserSignup;
