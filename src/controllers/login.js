import JWT from "jsonwebtoken";
import bcrypt from "bcrypt"
import User from "../models/user.js";


export async function handleLoginUser(req, res) {
    const { mobile, email,password} = req.body;
    console.log(mobile,password)
    if (
      [mobile, password].some((field) => !field || field.trim === "") &&
      [email, password].some((field) => !field || field.trim === "")
    ) {
      res.status(403).json({
          msg: "Invalid login credientials",
        }).end();
    }
   
    else{ const findUser=await User.findOne(
     {$or:[{mobile},{email}]}
    )
      if (findUser){
        const validPassword=await bcrypt.compare(password,findUser.password)
        if (validPassword){
          const jwt=JWT.sign({email , mobile},process.env.BCRYPT_SECRET,{expiresIn:"3 days"})
          res.cookie("jwt",jwt,{expiresIn:"3 days"})
          res.status(201).json({
              msg: "Successfull Login",
              jwt
            }).end();
        }else{
          res.status(403).json({
              msg: "Invalid Login credientials",
            }).end();
        }
      }
      else{
        res.status(402).json({
          msg: "Invalid Login credientials",
        }).end();
      }   
    }
  }
  