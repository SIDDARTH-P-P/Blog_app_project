import user_schema from "./schema/user_schema.js";
import post_data from "./schema/post_schema.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import path from "path"

const { sign } = jwt;



export async function get_blogs(req,res){
    let blogs = await post_data.find()
    res.json(blogs)
}

export async function uplodpost(req, res) {
    try {
        let { userid } = req.params
        let { caption } = req.body
        let user = await user_schema.findOne({_id:userid},{name:1,profile:1})
        let post = req.file
        let result = await post_data.create({
            caption,
            post,
            userid,
            user,
        })
        if(result){
          return  res.status(200).json("successfully upolad");
        }
        return res.status(403).json("Error upload");
    } catch (error) {
        console.log(error);
    }
}


export async function get_post(req, res) {
    try {
        let { id } = req.params;
        let post = await post_data.find({ userid: id })
        res.json(post)
    } catch (error) {
        console.log(error);
    }
}

export function get_image(req, res) {
    try {
        let { file } = req.params;
        return res.sendFile(path.resolve(`./uplode_images/${file}`))
    } catch (error) {
        console.log(error);
    }
}

export async function register(req, res) {
    try {
        let { name, email, password, profile } = req.body;
        let check = await user_schema.findOne({ name })
        if (check) {
            return res.status(403).json("User already exists");
        }
        let hashed = await bcrypt.hash(password, 10);
        let result = await user_schema.create({
            profile,
            name,
            email,
            password: hashed,
        })
        if (result) {
            return res.status(200).json("Account Successfully Created");
        }
        res.json("Error to create Account");
    } catch (error) {
        console.log(error);
    }
}


export async function login(req, res) {
    try {
        let { name, password } = req.body;
        let find = await user_schema.findOne({ name })
        if (!find) {
            return res.status(404).json("user not found")
        }
        let check = await bcrypt.compare(password, find.password)
        if (!check) {
            return res.status(403).json("Invalid username or password");

        }
        let token = await sign({ username: find.name, id: find._id }, process.env.SCRET_KEY, { expiresIn: "24h" })
        res.status(202).json({ msg: "successfully login", id: find._id, token });
    } catch (error) {
        console.log(error);
    }
}

export async function get_profile(req, res) {
    try {
        let { id } = req.params
        let datas = await user_schema.findOne({ _id: id })
        res.json(datas)
    } catch (error) {
        console.log(error);
    }
}