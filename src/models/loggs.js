import mongoose from "mongoose";

const loggsSchema = mongoose.Schema({
  IpAddress: {
    type: String,
    required: true,
  },
  request_method: {
    type: String,
  },
  request_path: String,
});

 const Loggs = mongoose.model("Loggs", loggsSchema);
 
export default Loggs