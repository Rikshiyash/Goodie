import { connectionStr } from "@/app/lib/db";
import { Delivery } from "@/app/lib/delivery";
import mongoose, { mongo } from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request , content) {
    let city = content.params.city
    let success = false;
    await mongoose.connect(connectionStr);
 let filter = {city:{$regex:new RegExp(city,'i')}}
    const result = await Delivery.find(filter)
    return NextResponse.json({result,success})
    
}