import { Todo } from "../Models/Todos.model.js";
import { ApiError } from "../Utils/Apierror.js";
import { asyncHandler } from "../Utils/Asynchandler.js";
import { ApiResponse } from "../Utils/Apiresponse.js";

const createTodo=asyncHandler( async (req,res)=>{
    const {title}=req.body;
    
})