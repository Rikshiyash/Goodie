"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function CustomerHeader(props) {
  console.log(props);

  // ✅ Start with safe defaults
  const [cartNumber, setCartNumber] = useState(0);
  const [cartItem, setCartItem] = useState([]);

  // ✅ Load localStorage only on client
  useEffect(() => {
    const cartStorage = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItem(cartStorage);
    setCartNumber(cartStorage.length);
  }, []);
  useEffect(() => {
  if (props.removeCartData) {
    let localCartItem = cartItem.filter((item) => {
      return item._id !== props.removeCartData;
    });

    setCartItem(localCartItem);
    setCartNumber(cartNumber - 1);

    // update localStorage
    localStorage.setItem("cart", JSON.stringify(localCartItem));

    // if cart is empty, remove it from localStorage
    if (localCartItem.length === 0) {
      localStorage.removeItem("cart");
    }
  }
}, [props.removeCartData]);

useEffect(()=>{
  if(props.removeCartData){
    localStorage.removeItem('cart');
    setCartNumber(0);
    setCartItem([])
  }

 } ,[props.removeCartData])


  // ✅ Update when new cartData comes
  useEffect(() => {
    if (props.cartData) {
      const cartStorage = JSON.parse(localStorage.getItem("cart")) || [];

      if (cartStorage.length > 0) {
        // If different restaurant, reset cart
        if (cartStorage[0].resto_id !== props.cartData.resto_id) {
          const updatedCart = [props.cartData];
          localStorage.setItem("cart", JSON.stringify(updatedCart));
          setCartItem(updatedCart);
          setCartNumber(1);
        } else {
          // Same restaurant, add to cart
          const updatedCart = [...cartStorage, props.cartData];
          localStorage.setItem("cart", JSON.stringify(updatedCart));
          setCartItem(updatedCart);
          setCartNumber(updatedCart.length);
        }
      } else {
        // If cart was empty
        const updatedCart = [props.cartData];
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setCartItem(updatedCart);
        setCartNumber(1);
      }
    }
  }, [props.cartData]);

  return (
    <header className="bg-yellow-600 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3075/3075977.png"
            alt="Food Logo"
            className="w-10 h-10"
          />
          <h1 className="text-white text-xl font-bold">Foodie</h1>
        </div>

        {/* Navigation Menu */}
        <nav>
          <ul className="flex gap-6 text-white font-medium">
            <li>
              <Link href="/" className="hover:text-gray-800 transition">
                Home
              </Link>
            </li>
            
            <li>
              <Link href="/userAuth" className="hover:text-gray-800 transition">
                Sign Up
              </Link>
            </li>
            <li>
              <Link href={cartNumber?"/cartPage":"#"} className="hover:text-gray-800 transition">
                Cart({cartNumber})
              </Link>
            </li>
            <li>
              <Link
                href="/restaurant"
                className="hover:text-gray-800 transition"
              >
                Add Restaurant
              </Link>
            </li>
            <li>
              <Link
                href="/deliverydashboard"
                className="hover:text-gray-800 transition"
              >
                Delivery Partner
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
