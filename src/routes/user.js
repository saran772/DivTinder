const express=require("express") 
const { userauth } = require("../middleware/auth")
const userRouter=express.Router()
const ConnectionRequestModel=require("../models/ConnectionRequestModel")

userRouter.get("/user/requests/received",userauth,async(req,res)=>{
    try{
        const loggedInUser=req.user
        const ConnectionRequest=await ConnectionRequestModel.find({
            touserid:loggedInUser._id,
            status:"interested"
        })
        res.json({message:"data  fetched succesfully!!",data:ConnectionRequest})
        .populate("fromuserId","firstName lastName age gender skills")

    }
    catch(err){
        req.statusCode(400).json({message:  "error detected"})
    }
})
userRouter.get("/user/connections",userauth,async(req,res)=>{
    try{
        const loggedInUser=req.user;
        const connectionreq=await ConnectionRequestModel.find({
            $or:[
                {fromuserId:loggedInUser._id,status:"accepted"},
                {touserid:loggedInUser._id,status:"accepted"}
            ]
        }).populate("fromuserId","firstName lastName age gender skills")
           .populate("touserId","firstName lastName age gender skills")

        const data=connectionreq.map((row)=> {
        if(row.fromuserId._id.tostring()===loggedInUser._id.tostring()){
            return row.touserid
        }
        return row.fromuserId
    })
        res.json({ data})

    }
     catch(err){
        req.statusCode(400).json({message:  "error detected"})
    }
})
module.exports=userRouter