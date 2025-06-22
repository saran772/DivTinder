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
   
})


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
