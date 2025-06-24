const mongoose=require("mongoose")
const validator=require("validator")
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
        validate(value){
            if(!["male","female","others"].includes(value)){    //validate only new obj not the existing one
                throw new Error("Gender not valid")
            }
        }
    }
},{
    timestamps:true
})
module.exports=mongoose.model("user",userschema)

//never trust req.body