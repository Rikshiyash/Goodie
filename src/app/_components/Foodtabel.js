"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const FoodTable = () => {
  const router = useRouter()
  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
    loadfooditems();
  }, []);

  const loadfooditems = async () => {
const restaurantData= JSON.parse(localStorage.getItem("restaurantUser"));
 const resto_id = restaurantData._id
    
    const response = await fetch("http://localhost:3000/api/restaurant/foods/"+ resto_id);
    const data = await response.json();
    console.log(data);
    if (data.success && Array.isArray(data.result)) {
      setFoodItems(data.result);
    } else {
      console.warn("Unexpected response format", data);
    }
  };



  const deletefooditem = async(id) => {
    let response = await fetch("http://localhost:3000/api/restaurant/foods/"+id , {
      method:"DELETE"
    })
    response = await response.json()
    if(response.success){
      loadfooditems()
    }else{
      alert("item not deleted")
    }
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <h2 className="text-3xl font-extrabold text-red-700 mb-6 text-center">
        🍱 Food Items
      </h2>

      <div className="overflow-x-auto rounded-lg border border-red-200 shadow-md">
        <table className="min-w-full divide-y divide-red-100 text-sm text-gray-700">
          <thead className="bg-red-100 text-red-800 uppercase font-semibold text-xs">
            <tr>
              <th className="px-6 py-3 text-left">S.N</th>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Price</th>
              <th className="px-6 py-3 text-left">Description</th>
              <th className="px-6 py-3 text-left">Image</th>
              <th className="px-6 py-3 text-left">Operation</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 bg-white">
            {foodItems.map((item, index) => (
              <tr key={item._id} className="hover:bg-red-50 transition">
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4 font-medium">{item.name}</td>
                <td className="px-6 py-4">₹{item.price}</td>
                <td className="px-6 py-4">{item.description}</td>
                <td className="px-6 py-4">
                  <img
                    src={item.path}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md border border-gray-200"
                  />
                </td>
                <td className="px-6 py-4 flex gap-2">
                  <button
                    onClick={() => router.push("/restaurant/dashboard/"+item._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deletefooditem(item._id)}
                    className="bg-gray-200 text-red-600 px-3 py-1 rounded-md hover:bg-red-100 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {foodItems.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-400">
                  No food items found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FoodTable;
