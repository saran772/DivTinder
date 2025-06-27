const express=require("express");
const authRouter=express.Router();
const User=require("../models/user");
const { validatesignup } = require("../utils/validation");
const bcrypt=require("bcrypt")




authRouter.post("/signup",async(req,res)=>{
    try{
      //validate the data
      validatesignup(req)
      //incript the data
      const{firstName,lastName,emailId,password}=req.body;
      const passwordhash=await bcrypt.hash(password,10); //here 10 is salt
      //create a instance new model
       const user=new User({firstName,lastName,emailId,password:passwordhash})
      
      await user.save();
      res.send("data sent succesfully!!")
    }
    catch(err){
    
        res.status(500).send("error detected"+ err.message)
    }
   
}) 

authRouter.post("/login",async(req,res)=>{
  try{
    const {emailId,password}=req.body
    const user=await User.findOne({emailId:emailId})
    if(!user){
      throw new Error("user not found")
    }
const ispasswordcheck=await user.validatepassword(password)
if(ispasswordcheck){
  //create a jwt token
  const token=await user.getJWT()//expire token in 1 day
  res.cookie("token",token,{expires:new Date(Date.now() + 8*3600000)})//expire cookie
  res.send("login succesfully!!!")
}
else{
  throw new Error("pass not correct")
}
  }
  catch(err){
      res.status(404).send("something went wrongh")

  }
})
module.exports=authRouter;