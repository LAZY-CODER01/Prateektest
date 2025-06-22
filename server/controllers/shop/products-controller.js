const Product = require("../../models/Products");

const getFilteredProducts = async (req, res) => {
  try {
    const {
      category = [],
      product = [],
      sortBy = "price-lowtohigh",
      page = 1,
      limit = 12,
    } = req.query;

    let filters = {};

    if (category.length > 0) {
      filters.category = { $in: category.split(",") };
    }

    if (product.length > 0) {
      filters.product = { $in: product.split(",") };
    }

    let sort = {};

    switch (sortBy) {
      case "price-lowtohigh":
        sort.price = 1;
        break;
      case "price-hightolow":
        sort.price = -1;
        break;
      case "title-atoz":
        sort.title = 1;
        break;
      case "title-ztoa":
        sort.title = -1;
        break;
      default:
        sort.price = 1;
        break;
    }

    // Convert page and limit to numbers
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Get total count for pagination
    const totalProducts = await Product.countDocuments(filters);
    const totalPages = Math.ceil(totalProducts / limitNum);

    // Get paginated products
    const products = await Product.find(filters)
      .sort(sort)
      .skip(skip)
      .limit(limitNum);

    res.status(200).json({
      message: "Products fetched successfully",
      success: true,
      data: products,
      pagination: {
        currentPage: pageNum,
        totalPages,
        totalProducts,
        productsPerPage: limitNum,
        hasNextPage: pageNum < totalPages,
        hasPrevPage: pageNum > 1,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Some error occured",
      success: false,
    });
  }
};

const getProductDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        success: false,
      });
    }
    res.status(200).json({
      message: "Product fetched successfully",
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      message: "Some error occured",
      success: false,
    });
  }
};

module.exports = { getFilteredProducts, getProductDetails };
