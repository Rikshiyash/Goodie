import React, { useState } from "react";
import Router from "next/navigation";
import { useRouter } from "next/navigation";

const RestaurantSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [c_password, setC_password] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const router = useRouter();
  const [error, setError] = useState(false);
  const [passerror, setPasserror] = useState(false);

  const handleSignup = async () => {
     console.log(email)
    if (password !== c_password) {
      setPasserror(true);
    } else {
      setPasserror(false);
    }
    if (
      !email ||
      !password ||
      !c_password ||
      !name ||
      !city ||
      !address ||
      !contact
    ) {
      setError(true);
      return false
    } else {
      setError(false);
    }
   

    let response = await fetch("http://localhost:3000/api/restaurant", {
      method: "POST",
      body: JSON.stringify({ name, email, city, address, contact, password }),
    });
    response = await response.json();

    if (response.success) {
      const { result } = response;
      delete result.password;
      localStorage.setItem("restaurantUser", JSON.stringify(result));

      router.push("/restaurant/dashboard");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8 bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-3xl font-bold text-center mb-6 text-red-600">
        Restaurant Signup
      </h2>
      <div className="space-y-4">
        {/* Email */}
        <div>
          <label className="block font-semibold mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter email"
            className="w-full px-4 py-2 border rounded-lg"
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && !email && (
            <span className="text-red-500 text-sm">enter the email</span>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block font-semibold mb-1">Password</label>
          <input
            type="password"
            placeholder="Create password"
            className="w-full px-4 py-2 border rounded-lg"
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && !password && (
            <span className="text-red-500 text-sm">enter the password</span>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block font-semibold mb-1">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm password"
            className="w-full px-4 py-2 border rounded-lg"
            onChange={(e) => setC_password(e.target.value)}
          />
          {error && !c_password && (
            <span className="text-red-500 text-sm">enter confirm password</span>
          )}
          {passerror && (
            <span className="text-red-500 text-sm">passwords do not match</span>
          )}
        </div>

        {/* Restaurant Name */}
        <div>
          <label className="block font-semibold mb-1">Restaurant Name</label>
          <input
            type="text"
            placeholder="Enter restaurant name"
            className="w-full px-4 py-2 border rounded-lg"
            onChange={(e) => setName(e.target.value)}
          />
          {error && !name && (
            <span className="text-red-500 text-sm">
              enter the restaurant name
            </span>
          )}
        </div>

        {/* City */}
        <div>
          <label className="block font-semibold mb-1">City</label>
          <input
            type="text"
            placeholder="Enter city"
            className="w-full px-4 py-2 border rounded-lg"
            onChange={(e) => setCity(e.target.value)}
          />
          {error && !city && (
            <span className="text-red-500 text-sm">enter the city</span>
          )}
        </div>

        {/* Address */}
        <div>
          <label className="block font-semibold mb-1">Full Address</label>
          <textarea
            rows="3"
            placeholder="Enter full address"
            className="w-full px-4 py-2 border rounded-lg"
            onChange={(e) => setAddress(e.target.value)}
          />
          {error && !address && (
            <span className="text-red-500 text-sm">enter the address</span>
          )}
        </div>

        {/* Contact */}
        <div>
          <label className="block font-semibold mb-1">Contact Number</label>
          <input
            type="tel"
            placeholder="Enter contact number"
            className="w-full px-4 py-2 border rounded-lg"
            onChange={(e) => setContact(e.target.value)}
          />
          {error && !contact && (
            <span className="text-red-500 text-sm">enter contact number</span>
          )}
          
        </div>

        {/* Signup Button */}
        <button
          type="button"
          onClick={handleSignup}
          className="w-full bg-red-500 text-white font-semibold py-2 rounded-lg hover:bg-red-600 transition-all"
        >
          Signup
        </button>
      </div>
    </div>
  );
};

export default RestaurantSignup;
