const mongoose=require("mongoose")
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
    },
    password:{
        type:String,
        required:true,
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