import { connectionStr } from "@/app/lib/db";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

import { Order} from "@/app/lib/ordersModel";
import Restaurant from "@/app/lib/restaurantModel";

export async function POST(request) {
    const payload =  await request.json();
    let success  = false;
    await mongoose.connect(connectionStr)
    const orderObj = new Order(payload)
    const result =  await orderObj.save();
    if(result){
        success = true;
    }
    return  NextResponse.json({result , success})
    
}

export async function GET(request) {
    let user_ID = request.nextUrl.searchParams.get('id')
    await mongoose.connect(connectionStr)
    let success = false;
    let result = await Order.find({user_ID:user_ID})
    if(result){
        
        let restoData=  await Promise.all(
            result.map(async(item)=>{
                let restoInfo = {};
                restoInfo.data = await Restaurant.findOne({_id : item.resto_ID})
                return restoInfo;
            })
        )
        result = restoData;
        success = true;
    }
    return NextResponse.json({result,success})
    
}