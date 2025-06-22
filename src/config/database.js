const mongoose=require("mongoose")
const ConnectDb=async()=>{
    await mongoose.connect("mongodb+srv://saranpreetsingh:kLQA49WroirlonZV@nodejs.gqso1yf.mongodb.net/devtinder?retryWrites=true&w=majority&appName=nodeJS")
}
module.exports={ConnectDb}