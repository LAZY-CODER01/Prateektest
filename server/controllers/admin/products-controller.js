const { imageUploadUtils } = require("../../helpers/cloudinary");
const Product = require("../../models/Products");

const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtils(url);
    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error occured",
    });
  }
};

// Create Product
const addProduct = async (req, res) => {
  try {
    const {
      image,
      title,
      productId,
      description,
      dimensions,
      category,
      product,
      price,
      salePrice,
      totalStock,
    } = req.body;
    const newlyCreatedProduct = new Product({
      image,
      title,
      productId,
      description,
      dimensions,
      category,
      product,
      price,
      salePrice,
      totalStock,
    });
    await newlyCreatedProduct.save();
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: newlyCreatedProduct,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error occured",
    });
  }
};
// FETCH All Products
const fetchAllProducts = async (req, res) => {
  try {
    const { page = 1, limit = 12 } = req.query;

    // Convert page and limit to numbers
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Get total count for pagination
    const totalProducts = await Product.countDocuments({});
    const totalPages = Math.ceil(totalProducts / limitNum);

    // Get paginated products
    const listOfProducts = await Product.find({}).skip(skip).limit(limitNum);

    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: listOfProducts,
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
    console.log(error);
    res.json({
      success: false,
      message: "Error occured",
    });
  }
};

// Get Product Statistics
const getProductStatistics = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments({});
    const productsOnSale = await Product.countDocuments({
      salePrice: { $gt: 0 },
    });
    const outOfStock = await Product.countDocuments({ totalStock: 0 });
    const lowStock = await Product.countDocuments({
      totalStock: { $gt: 0, $lte: 5 },
    });

    // Get category breakdown
    const categoryStats = await Product.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalProducts,
        productsOnSale,
        outOfStock,
        lowStock,
        categoryStats,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occurred while fetching product statistics",
    });
  }
};

// Update Product By Id
const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      image,
      title,
      productId,
      description,
      dimensions,
      category,
      product,
      price,
      salePrice,
      totalStock,
    } = req.body;

    let findProduct = await Product.findById(id);
    if (!findProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    findProduct.title = title || findProduct.title;
    findProduct.productId = productId || findProduct.productId;
    findProduct.description = description || findProduct.description;
    findProduct.dimensions = dimensions || findProduct.dimensions;
    findProduct.category = category || findProduct.category;
    findProduct.product = product || findProduct.product;
    findProduct.price = price === "" ? 0 : price || findProduct.price;
    findProduct.salePrice =
      salePrice === "" ? 0 : salePrice || findProduct.salePrice;
    findProduct.totalStock = totalStock || findProduct.totalStock;
    findProduct.image = image || findProduct.image;

    await findProduct.save();
    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: findProduct,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error occured",
    });
  }
};
// Delete Product By Id
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const findProduct = await Product.findByIdAndDelete(id);
    if (!findProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error occured",
    });
  }
};

module.exports = {
  handleImageUpload,
  addProduct,
  fetchAllProducts,
  getProductStatistics,
  editProduct,
  deleteProduct,
};
