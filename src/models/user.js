const mongoose=require("mongoose")
const validator=require("validator")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const userschema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minlength:5,
        maxlength:50
    },
    lastName:{
        type:String,
        minlength:5,
        maxlength:50
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("invalid email"+ value)
            }
        }
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("create a strong pass"+ value)
            }
        }
    },
    age:{
        type:Number
    },
    skills:{
        type:[String],
    },
    gender:{
        type:String,
        enum:{
            values:["male","female","other"]
        }
        // validate(value){
        //     if(!["male","female","others"].includes(value)){    //validate only new obj not the existing one
        //         throw new Error("Gender not valid")
        //     }
        // }
    }
},{
    timestamps:true
})
userschema.methods.getJWT=async function(){
    const user=this;
    const token=await jwt.sign({_id:user._id},"devtinder@123",{expiresIn:"1d"}) 
    return token
}
userschema.methods.validatepassword=async function(passwordinputbyuser){
    const user=this;
    const passwordHash=user.password
    const ispasswordvalid=await bcrypt.compare(passwordinputbyuser,passwordHash)
    return ispasswordvalid;
}
module.exports=mongoose.model("user",userschema)

//never trust req.body