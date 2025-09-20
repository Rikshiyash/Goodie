"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const DeliveryboyAuth = () => {
  const router = useRouter();
  const [isSignup, setIsSignup] = useState(true); // ✅ toggle between Signup & Login

  // Common fields
  const [password, setPassword] = useState("");

  // Signup fields
  const [name, setName] = useState("");
  const [c_password, setC_password] = useState("");
  const [city, setCity] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");

  // Login fields
  const [loginMobile, setLoginMobile] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [error, setError] = useState(false);
  const [passerror, setPasserror] = useState(false);

  useEffect(()=>{
    const deliverydata = JSON.parse(localStorage.getItem('deliveryboy'));
    if(deliverydata){
      router.push('/deliverydashboard')
    }
  },[])

  // ------------------- SIGNUP -------------------
  const handleSignup = async () => {
    if (password !== c_password) {
      setPasserror(true);
      return;
    }
    setPasserror(false);

    if (!name || !password || !c_password || !city || !mobile || !address) {
      setError(true);
      return;
    }
    setError(false);

    let response = await fetch("http://localhost:3000/api/deliveryboy/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, password, city, mobile, address }),
    });

    response = await response.json();

    if (response.success) {
      alert("Signup successful ✅");
      const { result } = response;
      delete result.password;
      localStorage.setItem("deliveryboy", JSON.stringify(result));
      router.push('/deliverydashboard')
      
    } else {
      alert(response.error || "Signup failed ❌");
    }
  };

  // ------------------- LOGIN -------------------
  const handleLogin = async () => {
    if (!loginMobile || !loginPassword) {
      setError(true);
      return;
    }
    setError(false);

    let response = await fetch("http://localhost:3000/api/deliveryboy/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mobile: loginMobile, password: loginPassword }),
    });

    response = await response.json();

    if (response.success) {
      alert("Login successful ✅");
      const { result } = response;
      delete result.password;
      localStorage.setItem("deliveryboy", JSON.stringify(result));
      router.push('deliverydashboard')
      
    } else {
      alert(response.error || "Invalid mobile or password ❌");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-12 bg-white shadow-lg rounded-lg p-8">
      {/* Toggle Tabs */}
      <div className="flex justify-center mb-6">
        <button
          onClick={() => setIsSignup(true)}
          className={`px-4 py-2 font-semibold rounded-l-lg ${
            isSignup ? "bg-orange-500 text-white" : "bg-gray-200"
          }`}
        >
          Signup
        </button>
        <button
          onClick={() => setIsSignup(false)}
          className={`px-4 py-2 font-semibold rounded-r-lg ${
            !isSignup ? "bg-orange-500 text-white" : "bg-gray-200"
          }`}
        >
          Login
        </button>
      </div>

      {/* Form */}
      {isSignup ? (
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

          {/* Submit */}
          <button
            type="button"
            onClick={handleSignup}
            className="w-full bg-orange-500 text-white font-semibold py-2 rounded-lg hover:bg-orange-600 transition-all"
          >
            Signup
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Mobile */}
          <div>
            <label className="block font-semibold mb-1">Mobile</label>
            <input
              type="tel"
              placeholder="Enter your mobile number"
              className="w-full px-4 py-2 border rounded-lg"
              value={loginMobile}
              onChange={(e) => setLoginMobile(e.target.value)}
            />
            {error && !loginMobile && (
              <span className="text-red-500 text-sm">Enter your mobile number</span>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block font-semibold mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full px-4 py-2 border rounded-lg"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
            {error && !loginPassword && (
              <span className="text-red-500 text-sm">Enter password</span>
            )}
          </div>

          {/* Submit */}
          <button
            type="button"
            onClick={handleLogin}
            className="w-full bg-green-500 text-white font-semibold py-2 rounded-lg hover:bg-green-600 transition-all"
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default DeliveryboyAuth;
