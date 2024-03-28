import JWT from "jsonwebtoken"
import User from "../models/user.js";

export async function handleUserAuthentication(req, res, next) {
    const {authorization}=req.headers
    // console.log(authorization)
    const token=authorization.split(" ")[1] || req.cookies.jwt
    // console.log(token)
    const re=await JWT.verify(token,process.env.BCRYPT_SECRET)
    // console.log(re)
    const { mobile, email } =re
    // console.log(req.data,req.form,req.body)
    // console.log(mobile,password)
    if (
      [mobile, email].every((field) => !field || field.trim === "") 
    ) {
      res
        .status(401)
        .json({
          msg: "Invalid login credientials",
        }).end();
    }else{
      const findUser = await User.findOne({ $or: [{ mobile:parseInt(mobile)}, { email }] });
      // console.log(findUser)
      if (findUser) {
            if (mobile) req.mobile=parseInt(mobile)
            if (email) req.email=email
            req.userId=findUser._id
          next();
        
      } else {
        res
          .status(402)
          .json({
            msg: "Invalid Login credientials",
          })
          .end();
      }
    }
    
  }