const express=require("express")
const app=express();
app.use((req,res)=>{
    res.send("hello server")
})
app.use("/",(req,res)=>{
    res.send("hello")
})
app.use("/test",(req,res)=>{
    res.send("hello")
})
app.listen(7777,()=>{
    console.log("data connected succesfully!")
});
