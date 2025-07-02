const express = require("express");
const {ConnectDb}= require("./config/database");
const cookieParser = require("cookie-parser");
const cors =require("cors")
const app = express();0
app.use(cors(
  {
    origin:" http://localhost:5173/",
    credentials:true, //allow cookies to be sent
  }
))
app.use(express.json());
app.use(cookieParser())

const authRouter=require("./routes/auth")
const profileRouter=require("./routes/profile")
const requestRouter=require("./routes/request");
const userRouter = require("./routes/user");

app.use("/",authRouter)
app.use("/",profileRouter)
app.use("/",requestRouter)
app.use("/",userRouter)



ConnectDb()
  .then(() => {
    console.log("database connected succesfully");
    app.listen(7777, () => {
      console.log("server connected succesfullyyyy!");
    });
  })
  .catch((err) => {
  
    console.log("error detected"+ err.message);
  });
