const express=require("express")
const app=express();

app.get("/user",(req,res)=>{
    res.send({firstname:"saranpreet",lastname:"singh"})
})
app.put("/user",(req,res)=>{
    res.send("data put succefully")
})
app.patch("/user",(req,res)=>{
    res.send("data patch succefully")
})
app.delete("/user",(req,res)=>{
    res.send("data delete succefully")
})
app.post("/user",(req,res)=>{
    res.send("data send succefully")
})

app.listen(7777,()=>{
    console.log("data connected succesfully!")
});

//in app.use we've set up route which responds to all the http methods
//but if we want limited access then us get put patch etc instead of app.use
