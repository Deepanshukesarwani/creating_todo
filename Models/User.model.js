// Resgister user using name email password 
import mongoose,{Schema} from "mongoose";

const UserSchema=new Schema({
    Name:{
        type:String,
        require:true,
        lowercase:true,
        trim: true, 
        index: true
    },
    Email:{
        type:String,
        require:true,
        unique: true,
        lowecase: true,
        trim: true, 
    },
    Password:{
        type:String,
        required: [true, 'Password is required'],
    },
    refreshtoken:{
        type:String,
    }
},{
    timestamps:true
})

export const User=mongoose.model("User",UserSchema);




















// kya kya kaam hai aaaj

// 1) todo wala api complete krna hai with register login logout and createtodo deletetodo updatetodo
// 2)visitor wala admin portal dekhna hai mujhe 
// 3) and thoda bahut dsa bhi krna hai 
