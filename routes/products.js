const express = require("express");
const router = express.Router();
const Product = require("../modules/productSchema");
const Category = require("../modules/categoriesSchema");

// GET ALL PRODUCTS
router.get("/", async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const startValue = (page > 0) ? page * limit - limit : 0;
    const endValue = page * limit;
    const products = await Product.find().populate('category').skip(startValue).limit(limit);
    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET SINGLE PRODUCT BY ID
router.get("/:productId", async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Product.findById(productId).populate('category');
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
