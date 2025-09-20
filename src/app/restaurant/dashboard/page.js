"use client"

import Addfooditem from '@/app/_components/Addfooditem'
import FoodTable from '@/app/_components/Foodtabel'
import RestaurantHeader from '@/app/_components/restaurantHeader'
import React, { useState } from 'react'

const Page = () => {
  const [addfood, setAddfood] = useState(false)

  return (
    <div>
      <RestaurantHeader />

      <button
        onClick={() => setAddfood(true)}
        className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-lg m-2"
      >
        Add Food
      </button>

      <button
        onClick={() => setAddfood(false)}
        className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-lg m-2"
      >
        Dashboard
      </button>

      {addfood ? <Addfooditem /> : <FoodTable />}
    </div>
  )
}

export default Page
