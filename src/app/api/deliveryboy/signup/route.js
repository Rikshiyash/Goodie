
import { connectionStr } from "@/app/lib/db";
import { Delivery } from "@/app/lib/delivery";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const payload = await request.json();

    await mongoose.connect(connectionStr);

    const user = new Delivery(payload);
    const result = await user.save();

    return NextResponse.json({ success: true, result });
  } catch (err) {
    console.error("Signup API Error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
