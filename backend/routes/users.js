const express = require("express");
const { upload, uploadImg, addProduct, deleteProduct, getAllProduct } = require("../controllers/users");

const router = express.Router();

// Api for Uploading Images
router.post("/upload", upload.single("product"), uploadImg);

// Api for adding new Products
router.post("/addproduct", addProduct)

// Api for removing Product
router.post("/removeproduct", deleteProduct)

// Api for getting All Products
router.get("/allproducts", getAllProduct)

module.exports = router