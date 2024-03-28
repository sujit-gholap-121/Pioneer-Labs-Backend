import User from "../models/user.js";


export async function handleGetAllUsers(req, res) {
    try{
        const users = await User.find({});
        res.status(200).json({
            message: "success at user",
            users,
          });
    }catch(e){
        res.status(501).json({
            message: "Error fetching Users",
          })
    }
  }
