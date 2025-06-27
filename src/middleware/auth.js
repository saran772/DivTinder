const User=require("../models/user")
const jwt=require("jsonwebtoken")
 const userauth=async(req,res,next)=>{
    //read the token from req.cookies
    //validate the token
    //find the user with decodeddata
    try{const {token}=req.cookies;
    if(!token){
        throw new Error("token not valid")
    }
    const decodeddata=await jwt.verify(token,"devtinder@123")
    const {_id}=decodeddata
    const user=await User.findById(_id)
    if(!user){
        throw new Error("user not valid")
    }
    req.user=user
   next()
    }
     catch(err){
      res.status(400).send("something went wrongh")
    } 
    }

module.exports={userauth}