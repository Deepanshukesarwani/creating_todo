import express from "express"
import router from './Routes/routes.js'
const app=express();
app.use(express.json({limit: "16kb"}))

app.use("/api/v1",router);
app.get('/',(req,res)=>{
    res.send("this is a home page of todo");
})
export { app }