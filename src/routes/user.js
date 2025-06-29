const express=require("express") 
const { userauth } = require("../middleware/auth")
const userRouter=express.Router()
const ConnectionRequestModel=require("../models/ConnectionRequestModel")

userRouter.get("/user/requests/received",userauth,async(req,res)=>{
    try{
        const loggedInUser=req.user
        const ConnectionRequest=await ConnectionRequestModel.find({
            touserId:loggedInUser._id,
            status:"interested"
        })
        res.json({message:"data  fetched succesfully!!",data:ConnectionRequest})
        .populate("fromuserId","firstName lastName age gender skills")

    }
    catch(err){
        req.status(400).json({message:  "error detected"})
    }
})
module.exports=userRouter