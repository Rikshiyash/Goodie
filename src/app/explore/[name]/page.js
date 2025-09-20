"use client";
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import CustomerHeader from "@/app/_components/CustomeHeader";
import CustomerFooter from "@/app/_components/CustomerFooter";

const Page = () => {

  const params = useParams();
  const searchParams = useSearchParams();

  const [cartData, setCartData] = useState(null); // 👈 make it array

  const name = params.name;
  const id = searchParams.get("id");

  const [restaurantDetails, setRestaurantDetails] = useState({});
  const [foodItems, setFoodItems] = useState([]);
  //const [cartStorage, setCartStorage] = useState(JSON.parse(localStorage.getItem('cart')))
  const [cartStorage, setCartStorage] = useState(
  typeof window !== "undefined" ? JSON.parse(localStorage.getItem("cart")) || [] : []
);

 const [cartIDs, setCartIDs] = useState(cartStorage?()=>cartStorage.map((items)=>{
     return items._id;
 }):[])

const [removeCartData, setRemoveCartData] = useState('')

  useEffect(() => {
    loadRestaurantDetails();
  }, []);

console.log(cartIDs)


  const loadRestaurantDetails = async () => {
    let response = await fetch("http://localhost:3000/api/customer/" + id);
    response = await response.json();


    if (response.success) {
      setRestaurantDetails(response.details);
      setFoodItems(response.fooditems);
    }
  };

const handleAddToCart = (item) => {
setCartData(item)
let localcartIDs = cartIDs;
localcartIDs.push(item._id)
setCartIDs(localcartIDs)
setRemoveCartData()

};
 const removeFromCart = (id)=>{
  setRemoveCartData(id)
  var localIds=cartIDs.filter(item=>item!=id);
  setCartIDs(localIds)
  setCartData()
 }


  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <CustomerHeader cartData={cartData} removeCartData={removeCartData} />

      {/* Banner */}
      <div
        className="relative h-[300px] flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092?q=80&w=2070&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center w-full px-4">
          <h1 className="text-white text-5xl font-bold mb-2">{decodeURI(name)}</h1>
          <p className="text-gray-200">{restaurantDetails.city}</p>
        </div>
      </div>

      {/* Restaurant Details */}
      <div className="flex-1 max-w-5xl mx-auto px-6 py-10">
        <div className="bg-white shadow-lg rounded-2xl p-6 mb-10">
          <h2 className="text-2xl font-semibold mb-4">
            About {restaurantDetails.name}
          </h2>
          <p className="text-gray-700 mb-2">
            📍 <span className="font-medium">{restaurantDetails.address}</span>
          </p>
          <p className="text-gray-700 mb-2">
            🏙️ <span className="font-medium">{restaurantDetails.city}</span>
          </p>
          <p className="text-gray-700">
            ✉️ <span className="font-medium">{restaurantDetails.email}</span>
          </p>
        </div>

        {/* Food Menu */}
        <h2 className="text-2xl font-semibold mb-6">🍽️ Menu</h2>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
          {foodItems.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition"
            >
              {/* Food Image */}
              <img
                src={item.path}
                alt={item.name}
                className="h-50 w-full object-cover"
              />

              {/* Food Details */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-800 mb-1">
                  {item.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  {item.description}
                </p>
                <p className="text-lg font-semibold text-green-600">
                  ₹ {item.price}
                </p>

                {/* Add to Cart Button */}
                {
                  cartIDs.includes(item._id) ?     <button
                     onClick={()=>removeFromCart(item._id)}     
                  className="mt-3 w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition"
                >
                  Remove
                </button>:<button
                  onClick={() => handleAddToCart(item)}
                  className="mt-3 w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition"
                >
                  Add to Cart
                </button>
                }
                
                
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <CustomerFooter />
    </div>
  );
};

export default Page;
