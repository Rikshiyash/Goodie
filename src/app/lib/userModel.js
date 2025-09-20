import  mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    city:String,
    address:String,
    contact:String,
}, {collection:"users"});

const User = mongoose.models.Users || mongoose.model("Users",userSchema)

export default User;