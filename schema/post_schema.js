import mongoose from "mongoose";

const post_data = new mongoose.Schema({
    caption:{type:String},
    post:{type:Object},
    userid:{type:String},
    user:{type:Object},
})

export default mongoose.model.posts || mongoose.model("post",post_data)