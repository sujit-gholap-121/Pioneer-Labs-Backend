import Loggs from "../models/loggs.js";

const HandleGetAllLoggs = async (req, res) => {
  const loggs = await Loggs.find({});
  res.send({ loggs });
};
export default HandleGetAllLoggs ;
