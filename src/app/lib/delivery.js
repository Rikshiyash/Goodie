import mongoose from "mongoose";

const deliverySchema = new mongoose.Schema({
  name: String,
  mobile: String,
  password: String,
  city: String,
  address: String,
}, { collection: "delivery" });

export const Delivery =
  mongoose.models.Delivery || mongoose.model("Delivery", deliverySchema);
