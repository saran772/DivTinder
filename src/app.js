const express=require("express")
const app=express();

app.get("/user/:userId/:name/:password",(req,res)=>{
    console.log(req.params)//use params for dynamically routing
    res.send({firstname:"saranpreet",lastname:"singh"})

})
app.put("/user",(req,res)=>{
    console.log(req.query)//we can read query from postman
    res.send("data put succefully")
})
app.patch("/user",(req,res)=>{
    res.send("data patch succefully")//we can also give dynamically route
})
app.delete("/user",(req,res)=>{
    res.send("data delete succefully")
})
app.post("/user",(req,res)=>{
    res.send("data send succefully")
})

app.listen(7777,()=>{
    console.log("data connected succesfullyyyy!")
});


//in app.use we've set up route which responds to all the http methods
//but if we want limited access then us get put patch etc instead of app.use
//we also also route like ab?c means ac as b is optional
//also ab+c means abbbbbbc any no of b's
//also ab*cd means starts from ab and ends from cd like abSARANcd
