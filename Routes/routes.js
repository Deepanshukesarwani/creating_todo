import { Router } from "express";
import {SignUP,login} from "../Controller/User.controller.js"
import { verifyjwt } from "../Middleware/Authmiddleware.js";
const router=Router();

router.route("/signup").post(SignUP);
// router.route("/login").post(login);
// checking 
router.route("/login").post(verifyjwt,login);



export default router