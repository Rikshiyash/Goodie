import { connectionStr } from "@/app/lib/db"
import Food from "@/app/lib/foodModel"
import Restaurant from "@/app/lib/restaurantModel"
import mongoose from "mongoose"
import { NextResponse } from "next/server"

export async function GET(request, content) {
    console.log(content.params.id)
    const id = content.params.id
    await mongoose.connect(connectionStr)
    let details = await Restaurant.findOne({_id:id})
    let fooditems = await Food.find({resto_id:id})
    return NextResponse.json({details , fooditems ,success:true})
    
}