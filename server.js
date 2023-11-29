import express from "express";
import router from "./router.js";
import connect_db from "./connect_db.js";
import dotenv from "dotenv";

dotenv.config()


const app = express();

app.use(express.json({limit:"25mb"}))
app.use("/",router)
app.use(express.static("./templates"))

connect_db().then(()=>{
    app.listen(process.env.PORT,(error)=>{
        if(error){
            console.log(error);
        }
        console.log("server Start");
    })
})
.catch((error) =>{
    console.log(error);
})