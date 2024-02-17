import mongoose,{Schema} from "mongoose";

const SubTodo_Schema=new Schema({

    description:{
        type:String,
        require:true
    },
    iscompleted:{
        type:Boolean,
    }
},{timestamps:true});

const TodoSchema=new Schema({
    title:{
        type:String,
        require:true,
    },
    createdBy:[
        {
            type:mongoose.Schema.ObjectId,
             ref:"User"
        }
    ],
    todos:[
        {
            type:mongoose.Schema.ObjectId,
            ref:"sub_todo"
        }
    ]
        
    },{
        timestamps:true
    })
export const Todo =mongoose.Schema("todo",TodoSchema);
export const SubTodo=mongoose.Schema("subtodo",SubTodo_Schema);
