// src/app/api/restaurant/foods/[id]/route.js

import { connectionStr } from "@/app/lib/db";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import Food from "@/app/lib/foodModel";

export async function GET(request, context) {
  const { id } = await context.params; // ✅ await params

  try {
    await mongoose.connect(connectionStr);
    const result = await Food.find({ resto_id: id });

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Error in GET /api/restaurant/foods/[id]:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}


export async function DELETE(request , context) {
  const {id} = await context.params;
  let success = true
  await mongoose.connect(connectionStr)
  const result = await Food.deleteOne({_id:id})
  if(result){
    success = true

  }
  return NextResponse.json({result , success})
  
}