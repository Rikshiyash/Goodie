import mongoose from "mongoose";

const orderModel = new mongoose.Schema(
  {
    user_ID: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    foodItmIDS: String,
    resto_ID: { type: mongoose.Schema.Types.ObjectId, ref: "restaurants" },
    deliveryBoy_ID: { type: mongoose.Schema.Types.ObjectId, ref: "deliveryboys" },
    status: String,
    amount: Number, // better as Number not String
  },
  { collection: "orders" }
);

// Always export as Model
export const Order = mongoose.models.orders || mongoose.model("orders", orderModel);
