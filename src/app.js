const express=require("express");
const { adminauth, userauth } = require("./middleware/auth");
const app=express();

app.use("/admin",adminauth);
app.post("/user/login",(req,res)=>{
    res.send("user logedin succesfully")
})

app.use("/user",userauth,(req,res)=>{
    res.send("user data sent")
})


app.get("/admin/getdata",(req,res)=>{
    res.send("admin data get")
})
app.get("/admin/deletedata",(req,res)=>{
    res.send("admin data delete")
})



app.listen(7777,()=>{
    console.log("data connected succesfullyyyy!")
})


//in app.use we've set up route which responds to all the http methods
//but if we want limited access then us get put patch etc instead of app.use
//we also also route like ab?c means ac as b is optional
//also ab+c means abbbbbbc any no of b's
//also ab*cd means starts from ab and ends from cd like abSARANcd
