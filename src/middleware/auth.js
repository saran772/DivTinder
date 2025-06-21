const adminauth=(req,res,next)=>{
    console.log("admin auth is checking")
    const tokens="xyz"
    const isauthorized= tokens==="xyz"
    if(!isauthorized){
        res.status(401).send("unauthorized data")
    }
    else{
        next();
    }
}
 const userauth=(req,res,next)=>{
    console.log("user auth is checking")
    const tokens="xyz"
    const isauthorized= tokens==="xyz"
    if(!isauthorized){
        res.status(401).send("unauthorized data")
    }
    else{
        next();
    }
}
module.exports={adminauth,userauth}