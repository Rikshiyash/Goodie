"use client"

import React, { useState } from 'react'
import RestaurantLogin from '../_components/restaurantLogin'
import RestaurantSigup from '../_components/restaurantSigup'
import RestaurantHeader from '../_components/restaurantHeader'
import RestaurantFooter from '../_components/restaurantFooter'


const Restaurant = () => {
    const[login,setLogin] = useState(true)
  return (
   <>
 <RestaurantHeader/>
  
  {login ? <RestaurantLogin /> : <RestaurantSigup />}

  <div className="text-center mt-4">
    <button
      onClick={() => setLogin(!login)}
      className="text-red-500 underline hover:text-red-700 transition-all duration-300"
    >
      {login ? "Don't have an account? Signup" : "Already have an account? Login"}
    </button>
  </div>
  <RestaurantFooter/>
</>

  )
}

export default Restaurant
