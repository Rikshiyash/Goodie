import { Delivery } from "@/app/lib/delivery";
import { connectionStr } from "@/app/lib/db";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
  let payload = await request.json();
  let success = false;

  await mongoose.connect(connectionStr);

  // ✅ Fix: change findone → findOne
  const result = await Delivery.findOne({
    mobile: payload.mobile,
    password: payload.password,
  });

  if (result) {
    success = true;
  }

  return NextResponse.json({ result, success });
}
