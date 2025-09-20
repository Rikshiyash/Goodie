"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Addfooditem = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [path, setPath] = useState("");
  const [description, setDescription] = useState("");
  const [error, seterror] = useState(false);
  const router = useRouter()

  const handleSubmit = async () => {
    if (!name || !price || !path || !description) {
      seterror(true);
      return false;
    } else {
      seterror(false);
    }

    let resto_id;
    const restaurantData = JSON.parse(localStorage.getItem("restaurantUser"));
    if (restaurantData) {
      resto_id = restaurantData._id;
    }

    let response = await fetch("http://localhost:3000/api/restaurant/foods", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        price: Number(price),
        path,
        description,
        resto_id,
      }),
    });

    response = await response.json();
    if (response.success) {
      alert("Food item added");
      // Optionally clear fields
      setName("");
      setPrice("");
      setPath("");
      setDescription("");
    
    }
    
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-6">
        <h2 className="text-2xl font-bold text-red-700 text-center">Add New Food Item</h2>

        <div className="flex flex-col">
          <label className="font-semibold mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Paneer Tikka"
            className="p-2 border border-gray-300 rounded-md"
          />
          {error && !name && (
            <span className="text-red-500 text-sm">Enter the food name</span>
          )}
        </div>

        <div className="flex flex-col">
          <label className="font-semibold mb-1">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="e.g. 250"
            className="p-2 border border-gray-300 rounded-md"
          />
          {error && !price && (
            <span className="text-red-500 text-sm">Enter the food price</span>
          )}
        </div>

        <div className="flex flex-col">
          <label className="font-semibold mb-1">Image Path</label>
          <input
            type="text"
            value={path}
            onChange={(e) => setPath(e.target.value)}
            placeholder="e.g. /images/paneer.jpg"
            className="p-2 border border-gray-300 rounded-md"
          />
          {error && !path && (
            <span className="text-red-500 text-sm">Enter the image path</span>
          )}
        </div>

        <div className="flex flex-col">
          <label className="font-semibold mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter food description"
            className="p-2 border border-gray-300 rounded-md"
          />
          {error && !description && (
            <span className="text-red-500 text-sm">Enter the food description</span>
          )}
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-red-600 text-white py-2 rounded-full font-semibold hover:bg-red-700 transition"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Addfooditem;
