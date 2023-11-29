import mongoose from "mongoose";

export default function connect_db(){
    return mongoose.connect(process.env.DB_URI)
}