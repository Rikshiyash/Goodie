import { connectionStr } from "@/app/lib/db";
import Food from "@/app/lib/foodModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = params;
  await mongoose.connect(connectionStr);

  const result = await Food.findById(id);
  if (!result) {
    return NextResponse.json({ success: false, message: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, result });
}




export async function PUT(request, { params }) {
  const { id } = params;
  await mongoose.connect(connectionStr);
  
  const payload = await request.json();
  const result = await Food.findOneAndUpdate({ _id: id }, payload, { new: true });

  const success = !!result;

  return NextResponse.json({ success, result });
}
