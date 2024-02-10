import { User } from "../Models/User.model.js";
import { ApiError } from "../Utils/Apierror.js";
import { asyncHandler } from "../Utils/Asynchandler.js";
import { ApiResponse } from "../Utils/Apiresponse.js";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import jwt from "jsonwebtoken"

// 1)SignUP 
// extract name email and password from body and incrypt the password and save 

// 2) Login
// extract the Email and Password from the body and decrypt it 
// making check of fields is empty or not 
// make a db call to check user exist or not with that email 
// and the decrypt the Password and compare the Password 
// if password matched then generate access and referesh token to move on dashboard and saving the acess token in the 
// cookies and header both 



const generateAccessAndRefereshTokens = async(userId) =>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}

// register user 
const SignUP =asyncHandler(async (req,res)=>{
    const {Name,Email,Password}=req.body;
    // console.log(Password+"jai shree ram");
    if (
        [ Email, Name, Password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

     const existedUser = await User.findOne({
        $or: [{ Name }, { Email }]
    })

     if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }

    // encrypting password of the user to store on db
    // console.log(Password);
   const hashedPass= await bcrypt.hash(Password, 10 );
    // console.log(hashedPass);
    const user = await User.create({
        // Name,
        Email, 
        Password:hashedPass,
        Name
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )

})


// login user 
const login=asyncHandler(async (req,res)=>{
    const{Email,Password}=req.body;

    if (
        [ Email,Password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const user=await User.findOne({Email});

    if(!user)
    {
        throw new ApiError(409,"User is not registered");
    }
    else{
        const decryptPass= await bcrypt.compare(Password,user.Password);
        // console.log(decryptPass);
        if(decryptPass)
        {
            // token creation access and refresh token 
            const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(user._id);
             console.log(accessToken);
            const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

            const options = {
                httpOnly: true,
                secure: true
            }
        
            return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new ApiResponse(
                    200, 
                    {
                        user: loggedInUser, accessToken, refreshToken
                    },
                    "User logged In Successfully"
                )
            )
        }
    }

})
















export {SignUP,login}
