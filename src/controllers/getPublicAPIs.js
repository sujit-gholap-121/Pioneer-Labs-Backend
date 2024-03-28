const handleGetAPIs = async (req, res) => {
  const { category, limit = 10 } = req.query;
  try {
    const DATA = await fetch(`${process.env.PUBLIC_APIS}`);
    const json_Data = await DATA.json();
    // console.log(json_Data)
    if (!category) {
      // console.log(true)
      res.status(202).send({
        result: json_Data.entries.splice(0, limit),
      });
      return;
    }
    const itemCategories = json_Data.entries.map((item) => item["Category"]);
    const invalidUserCategory = category.some(
      (item) => !itemCategories.includes(item)
    );
    console.log(invalidUserCategory);
    if (invalidUserCategory) {
      res.status(402).json({
        msg: "Invalid Categories Provided",
      });
    } else {
      const result = json_Data.entries.filter((item) =>
        category.includes(item.Category)
      );
      console.log(result);
      res.status(211).json({
        msg: "Successfully fetched Public APIs",
        result: result,
      });
    }

    // const re=result.filter((item,index,arr)=>{
    //   if (arr.indexOf(item)===index){
    //     return item
    //   }
    // })
  } catch (e) {
    res
      .status(502)
      .json({ msg: "Error Occuring while fetching APIs", error: e.message });
  }
};
export default handleGetAPIs;
