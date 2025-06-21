const express=require("express")
const app=express();

app.get("/user",(req,res,next)=>{
    console.log("route handling-1")
    next()
},
app.get("/user",(req,res,next)=>{
    console.log("route handling-2")
    next()
}),
app.get("/user",(req,res,next)=>{
    console.log("route handling-3")
    res.send("3rd router")
}))// multiple routers


app.listen(7777,()=>{
    console.log("data connected succesfullyyyy!")
});


//in app.use we've set up route which responds to all the http methods
//but if we want limited access then us get put patch etc instead of app.use
//we also also route like ab?c means ac as b is optional
//also ab+c means abbbbbbc any no of b's
//also ab*cd means starts from ab and ends from cd like abSARANcd
