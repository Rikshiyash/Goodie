import { connectionStr } from "@/app/lib/db";
import Restaurant from "@/app/lib/restaurantModel";
import mongoose from "mongoose";

import { NextResponse } from "next/server";

export async function GET() {
    await mongoose.connect(connectionStr)
    const data  = await Restaurant.find()
    console.log(data)
    return NextResponse.json({result:data})
    
}
  


export async function POST(request) {
  const payload = await request.json();
  let result;

  await mongoose.connect(connectionStr);

  if (payload.login) {
    // Correctly query the database for login
    result = await Restaurant.findOne({
      email: payload.email,
      password: payload.password,
    });
  } else {
    const restaurant = new Restaurant(payload);
    result = await restaurant.save();
  }

  return NextResponse.json({ result, success: true });
}
