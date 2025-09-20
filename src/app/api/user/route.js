import { connectionStr } from "@/app/lib/db";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import User from "@/app/lib/userModel";

export async function POST(request) {
    const payload =  await request.json();
    let success  = false;
    await mongoose.connect(connectionStr)
    const user = new User(payload)
    const result =  await user.save();
    if(result){
        success = true;
    }
    return  NextResponse.json({result , success})
    
}