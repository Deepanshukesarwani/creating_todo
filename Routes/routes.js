import { Router } from "express";
import {SignUP,login,logout,refreshtoken} from "../Controller/User.controller.js"
import { verifyjwt } from "../Middleware/Authmiddleware.js";
const router=Router();

router.route("/signup").post(SignUP);
// router.route("/login").post(login);
// checking 
router.route("/login").post(login);
router.route("/logout").post(verifyjwt,logout);
router.route("/refreshToken").post(refreshtoken);

// setting end point of refresh token 



export default router