import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
  email: String,
  name: String,
  password: String,
  city: String,
  address: String,
   contact: String
},{collection:"restaurant"});

const Restaurant = mongoose.models.restaurant || mongoose.model("restaurant", restaurantSchema);

export default Restaurant;
