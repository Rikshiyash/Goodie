import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  path: String,
  description: String,
  resto_id: String, // OR keep ObjectId and cast in route.js
}, { collection: "food" }); // if you specifically want collection name 'food'

const Food = mongoose.models.Food || mongoose.model("Food", foodSchema);
export default Food;
