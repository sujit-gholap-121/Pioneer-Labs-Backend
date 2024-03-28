const Logout = async (req, res) => {
  // console.log(req.cookie,req.cookies)
  try {
    res.cookie("jwt", null);
    res.status(203).json({ msg: "User logged out" });
  } catch (e) {
    res.status(404).json({ msg: "Error while logging out" });
  }
};
export default Logout;
