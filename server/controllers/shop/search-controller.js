const Product = require("../../models/Products");

const searchProducts = async (req,res) => {
  try {

    const {keyword} = req.params;
    if (!keyword || typeof keyword !== 'string') {
      return res.status(400).json({
        success: false,
        message: "Search keyword is requireda and must be in String format.",
      });
    }

    const regEx = new RegExp(keyword, "i"); // 'i' for case-insensitive search

    const createSearchQuery = {
      $or: [
        { title: regEx },
        { description: regEx },
        { category: regEx },
        { product: regEx },
      ],
    }

    const searchResults = await Product.find(createSearchQuery);

    res.status(200).json({
      success: true,
      message: "Products found successfully",
      data: searchResults,
    });
    
  } catch (error) { 
    console.error("Error searching products:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while searching for products.",
    });
    
  }
}


module.exports = {
  searchProducts,
};