import { Router } from "express";
import {SignUP,login} from "../Controller/User.controller.js"
const router=Router();

router.route("/signup").post(SignUP);
router.route("/login").post(login);


export default router