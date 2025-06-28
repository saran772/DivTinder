const express=require("express")
const profileRouter=express.Router()
const{userauth}=require("../middleware/auth")
const {validateEditProfileData}=require("../utils/validation")

profileRouter.get("/profile/view",userauth,async(req,res)=>{
 try{
  const user=req.user
res.send(user)
 }

  catch(err){
      res.status(404).send("something went wrongh")
    } 
})
profileRouter.patch("/profile/edit",userauth,async(req,res)=>{
    try{
        if(!validateEditProfileData(req)){
            throw new Error("invalid data sent")
        }
        const loggedInuser=req.user
        Object.keys(req.body).forEach(key=>loggedInuser[key]=req.body[key])
        await loggedInuser.save()
        res.json({message:`${loggedInuser.firstName} your data was updated succesfully!!`,data:loggedInuser})
    }
    catch(err){
        res.status(400).send("error detected:"+ err.message)
    }
})

module.exports=profileRouter;