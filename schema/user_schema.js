import mongoose from "mongoose";

const user_schema = new mongoose.Schema({
    profile:{type:String,},
    name:{type:String},
    email:{type:String},
    password:{type:String},
})
export default mongoose.model.users || mongoose.model("user",user_schema);