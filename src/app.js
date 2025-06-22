const express = require("express");
const {ConnectDb}= require("./config/database");
const User=require("./models/user")

const app = express();
app.use(express.json());
app.post("/signup",async(req,res)=>{
    const user=new User(req.body)
    try{
         await user.save();
         res.send("data sent succesfully!!")
    }
    catch(err){
        res.status(500).send("error detected"+ err.message)
    }
   
}) //POST API
app.get("/user",async(req,res)=>{
    const useremail=req.body.emailId
    try{
      const users=await User.find({ emailId : useremail })
      if(users.length===0){
         res.status(400).send("something went wrong")
      }
      else{
      res.send(users)}
    }
    catch(err){
      res.status(404).send("something went wrongh")
    }
}) //GET all data of same api
app.get("/user/one",async(req,res)=>{
  const useremail=req.body.emailId
  try{
  const userss=await User.findOne({emailId : useremail})
  if(!userss){
     res.status(400).send("something went wrong")
  }
  else{
    res.send(userss)
  }
}
catch(err){
  res.status(404).send("something went wrongh")
}
})
//get data of only one api in multiple data


ConnectDb()
  .then(() => {
    console.log("database connected succesfully");
    app.listen(7777, () => {
      console.log("server connected succesfullyyyy!");
    });
  })
  .catch((err) => {
    console.log("error detected");
  });
