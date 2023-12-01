import { Router } from "express";
import * as fun from "./route_handler.js"
import multer from "multer";

const router = Router();

const storage = multer.diskStorage({
    destination:"./uplode_images",
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})

const uploder = multer({storage:storage});

router.route("/uplodpost/:userid").post(uploder.single("post"),fun.uplodpost);
router.route("/register").post(fun.register);
router.route("/login").post(fun.login);
router.route("/get_profile/:id").get(fun.get_profile); 


router.route("/update/:id").post(uploder.single("post"),fun.update_post);
router.route("/get_post_update/:id").get(fun.get_post_update);
router.route("/del/:id").get(fun.del);

router.route("/update_profile/:id").post(fun.update_profile)

router.route("/get_post/:id").get(fun.get_post);
router.route("/image/:file").get(fun.get_image);
router.route("/get_blogs").get(fun.get_blogs);

export default router;