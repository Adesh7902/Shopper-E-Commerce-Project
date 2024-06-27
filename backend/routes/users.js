const express = require("express");
const {
  upload,
  uploadImg,
  addProduct,
  deleteProduct,
  getAllProduct,
  signupUser,
  loginUser,
  newCollection,
  popularInWomen,
  addToCart,
  fetchUser,
  removeFromCart,
  getCart,
} = require("../controllers/users");

const router = express.Router();

// Api for Uploading Images
router.post("/upload", upload.single("product"), uploadImg);

// Api for adding new Products
router.post("/addproduct", addProduct);

// Api for removing Product
router.post("/removeproduct", deleteProduct);

// Api for getting All Products
router.get("/allproducts", getAllProduct);

// Endpoint for Signup
router.post("/signup", signupUser);

// Endpoint for Login
router.post("/login", loginUser);

// Endpoint for getting new collection
router.get("/newcollection", newCollection);

// Endpoint for getting popular in women
router.get("/popularinwomen", popularInWomen);

// Endpoint for adding product in cart
router.post("/addtocart", fetchUser, addToCart);

// Endpoint for removing product from cart
router.post("/removefromcart", fetchUser, removeFromCart);

// Endpoint for getting cart data
router.post("/getcart", fetchUser, getCart) 

module.exports = router;
