import jwt from "jsonwebtoken";
import { asyncHandler } from "../Utils/Asynchandler.js";
import { ApiError } from "../Utils/Apierror.js";
import { ApiResponse } from "../Utils/Apiresponse.js";
import { User } from "../Models/User.model.js";

const verifyjwt=asyncHandler(async (req,res,next)=>{
   try {
     const token= req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
     // console.log(token+" "+"token consolelog kra rahe");
     if(!token)
     {
         throw new ApiError(401,"Unauthorized request");
     }
 
     const decode=jwt.verify(token,process.env.ACESS_TOKEN_KEY);
     const user = await User.findById(decode?._id).select("-Password -refreshToken")
     
         if (!user) {
             
             throw new ApiError(401, "Invalid Access Token")
         }
     
         req.user = user;
         next()
   } catch (error) {
    throw ApiError(404,error?.message || "invalid token")
   }

    
})

export {verifyjwt};