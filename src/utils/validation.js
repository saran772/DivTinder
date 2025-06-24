const validator=require("validator")
const validatesignup=(req)=>{
    const{firstName,lastName,emailId,password}=req.body
    if(!firstName || !lastName){
        throw new Error("please write the name first")
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("enter valid email address")
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("enter a strong password")
    }
}
module.exports={validatesignup}