import express from "express";
import cors from "cors"
import "dotenv/config";
import connectToMongo from "./DB/mongoDBConnection.js";
import userRouter from "./routers/user.js"
// import User from "./routes/user.js"
import Loggs from "./models/loggs.js";
import cookieParser from "cookie-parser"

const app = express();

app.use(express.static("public"))
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser())
app.use(cors())
app.use(async (req, res, next) => {
    await Loggs.create({
      IpAddress: req.ip,
      request_method: req.method,
      req_path: req.req_path,
    });
    next();
  });
  
  
  const connectAndListen = async () => {
    try {
      await connectToMongo();
      app.on("error", (error) => {
        console.log(error.message);
      });
      app.listen(process.env.PORT, () => {
        console.log("listening at port :4000");
      });
    } catch (error) {
        console.log("Error while Listening to database"),
        error.message
    
    }
  };
  
  connectAndListen();
  
  app.use("/user", userRouter);
  