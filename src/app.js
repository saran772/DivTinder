const express=require("express");

const app=express();
//this is a wildcard error handling but it is not proper(NOT WRITTEN CORRECT VERSION)
app.use("/",(err,req,res,next)=>{
    if(err){
    res.status(500).send("something went wronghh")}
})

//this is try catch and always use this
app.get("/user",(req,res)=>{
    try{
        throw new error("jhvsjkbf")
        res.send("user data")
    }
    catch(err){
          res.status(500).send("something went wrong")//ALWAYS USED NEXT(ERR )IN CATCH STATEMENT
    }
})

//ITS A GLOBAL ERROR HANDLER ALWAYS WRITTEN AT THE LAST OF THE CODE(NOT WRITTEN CORRECT VERSION)
app.use("/",(err,req,res,next)=>{
    if(err){
    res.status(500).send("something went wronghh")}
})

app.listen(7777,()=>{
    console.log("data connected succesfullyyyy!")
})


//in app.use we've set up route which responds to all the http methods
//but if we want limited access then us get put patch etc instead of app.use
//we also also route like ab?c means ac as b is optional
//also ab+c means abbbbbbc any no of b's
//also ab*cd means starts from ab and ends from cd like abSARANcd
