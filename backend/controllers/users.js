const multer = require("multer");
const path = require("path");
const Product = require("../models/Products/product.models");
const port = 4000;

// Configure multer storage
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

const uploadImg = (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
  });
};

//   Api for creating Product
const addProduct = async (req, res) => {
  let products = await Product.find({});
  let id; // gets id of latest product and gives new id which is id+1 to newly added product
  if (products.length > 0) {
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id + 1;
  } else {
    id = 1;
  }

  const product = new Product({
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });
  console.log(product);
  await product.save();
  console.log("Saved");
  res.json({
    success: true,
    name: req.body.name,
  });
};

// Api for Deleting Product
const deleteProduct = async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  console.log("Removed");
  res.json({
    success: true,
    name: req.body.name,
  });
};

// Api for getting All Products
const getAllProduct = async (req, res) => {
  let products = await Product.find({});
  console.log("All Products Fetched");
  res.send(products);
};

module.exports = {
  upload,
  uploadImg,
  addProduct,
  deleteProduct,
  getAllProduct,
};
