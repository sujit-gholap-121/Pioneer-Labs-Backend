import User from "../models/user.js";
import bcrypt from "bcrypt"

export async function handleCreateUser(req, res) {
    console.log(req.body);
    const { name, mobile, mobile_prefix, email, password } =
      req.body;
    try {
      if (
        [name, mobile, email, password].some(
          (ele) => ! ele || ele?.trim===""
        )
      ) {
        res.status(401).json({ msg: "Fill all required Data" }).end();
        return
      }
      const result=await User.findOne({
        $or:[{email:email.toLowerCase()},{mobile}]
      })
  
      if (result){
        res.status(402).json("User already Exists").end();
        return
      }
      else{

        const hashedPassword=await bcrypt.hash(password,10)
  
        const createdUser=await User.create({
          name,
          mobile,
          email:email.toLowerCase(),
          password:hashedPassword,
      
        });
    
        const findUser=await User.findById(createdUser._id).select("-password")
    
        if (!findUser){
          res.status(401).json("Error finding a User").end();
          return
        }
    
        res.status(200).json({ message: "User successfully created" ,user:findUser});
      
      }} catch (e) {
      res.status(401).json("Error creacting a User").end();
    }
  }