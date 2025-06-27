const express=require("express")
const requestRouter=express.Router()
const{userauth}=require("../middleware/auth")


requestRouter.post("/sendconnectionrequest",userauth,async(req,res)=>{
  const user=req.user
  res.send(user.firstName + ": sent coonection request")
})
module.exports=requestRouter;