import { connectionStr } from "@/app/lib/db";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

import { Order} from "@/app/lib/ordersModel";
import Restaurant from "@/app/lib/restaurantModel";

export async function GET(request, { params }) {
  let id = params.id;
  await mongoose.connect(connectionStr);

  let success = false;
  let result = await Order.find({ deliveryBoy_ID: id });

  if (result && result.length > 0) {
    let restoData = await Promise.all(
      result.map(async (item) => {
        let restoInfo = {};
        restoInfo.data = await Restaurant.findOne({ _id: item.resto_ID });
        return restoInfo;
      })
    );
    result = restoData;
    success = true;
  }

  return NextResponse.json({ result, success });
}
