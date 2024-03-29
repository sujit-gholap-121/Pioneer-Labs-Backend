import mongoose from "mongoose";

const userScheme = mongoose.Schema(
  {
    name: {
      type: String,
      // required: true,
    },
    mobile_prefix:{
      type:Number
    },
    uId: {
      type: Number,
      unique: true,
      // required: true,
    },
    mobile: {
      type: Number,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      // unique: true,
    },
    userRole: {
      required:true,
      type: String,
     
    },
    password: {
      type: String,
      required: true,
    },
    DOB: {
      type:Date
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Transgender", "Other"],
    },
    profileImg: {
      type: String,
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.iconfinder.com%2Ficons%2F6755696%2Faccount_guest_profile_user_icon&psig=AOvVaw0rAXIGUJlEHb4spw2StXfJ&ust=1711303292491000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCIj5ltv7ioUDFQAAAAAdAAAAABAQ",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userScheme);
export default User;
