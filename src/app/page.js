"use client";

import { use, useEffect, useState } from "react";
import CustomerHeader from "./_components/CustomeHeader";
import CustomerFooter from "./_components/CustomerFooter";
import { useRouter } from "next/navigation";


export default function Home() {
  const [location, setLocation] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [selectedCity, setSelectedCity] = useState(""); // ✅ track selected city
  const router = useRouter()

  // ✅ move loadRestaurants outside useEffect so we can reuse it
  const loadRestaurants = async (params = {}) => {
    let url = "http://localhost:3000/api/customer";
    if (params?.location) {
      url = url + "?location=" + params.location;
    } else if (params?.restaurant) {
      url = url + "?restaurant=" + params.restaurant;
    }
    let response = await fetch(url);
    response = await response.json();
    if (response.result) {
      setRestaurants(response.result);
    }
  };

  useEffect(() => {
    async function loadLocations() {
      let response = await fetch("http://localhost:3000/api/customer/location");
      response = await response.json();
      if (response.result) {
        setLocation(response.result);
      }
    }
    loadLocations();
    loadRestaurants(); // load all restaurants initially
  }, []);

  // ✅ handle select change
  const handleCityChange = (e) => {
    const city = e.target.value;
    setSelectedCity(city);
    loadRestaurants({ location: city });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <CustomerHeader />

      <main className="flex-grow">
        {/* Banner Section */}
        <div
          className="relative h-[300px] flex items-center justify-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092?q=80&w=2070&auto=format&fit=crop')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>

          <div className="relative z-10 text-center w-full px-4">
            <h1 className="text-white text-3xl font-bold mb-6">
              Food Delivery App
            </h1>

            {/* Search Box with City Dropdown */}
            <div className="bg-white rounded-md flex w-full max-w-2xl mx-auto shadow-lg">
              <select
                value={selectedCity}
                onChange={handleCityChange} // ✅ call loadRestaurants here
                className="p-3 border-r rounded-l-md outline-none text-gray-600"
              >
                <option value="" disabled>
                  Select City
                </option>
                {location.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <input
              onChange={(e)=>loadRestaurants({restaurant:e.target.value})}
                type="text"
                placeholder="Enter food or restaurant name"
                className="p-3 flex-1 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Restaurant List */}
        <div className="restaurant-list-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-8 bg-gray-50">
          {restaurants.map((item) => (
            <div 
            onClick={()=>router.push('explore/'+item.name+"?id="+item._id)}
              key={item._id}
              className="bg-gray-100 rounded-2xl shadow-lg p-6 transition hover:scale-105 hover:shadow-2xl duration-300"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {item.name}
              </h3>
              <p className="text-gray-600 mb-1">
                <span className="font-semibold">Contact:</span> {item.contact}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-semibold">Email:</span> {item.email}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-semibold">Address:</span> {item.address}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">City:</span>{" "}
                {item.city.charAt(0).toUpperCase() + item.city.slice(1)}
              </p>
            </div>
          ))}
        </div>
      </main>

      <CustomerFooter />
    </div>
  );
}
