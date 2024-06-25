const multer = require("multer");
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Product = require("../models/Products/product.models");
const Users = require("../models/Users/user.models");
const { error } = require("console");
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
  try {
    res.json({
      success: 1,
      image_url: `http://localhost:${port}/images/${req.file.filename}`,
    });
  } catch (error) {
    console.error("Image Upload Error:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// Api for creating Product
const addProduct = async (req, res) => {
  try {
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
  } catch (error) {
    console.error("Add Product Error:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// Api for Deleting Product
const deleteProduct = async (req, res) => {
  try {
    await Product.findOneAndDelete({ id: req.body.id });
    console.log("Removed");
    res.json({
      success: true,
      name: req.body.name,
    });
  } catch (error) {
    console.error("Delete Product Error:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// Api for getting All Products
const getAllProduct = async (req, res) => {
  try {
    let products = await Product.find({});
    console.log("All Products Fetched");
    res.send(products);
  } catch (error) {
    console.error("Get All Products Error:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// Api for signup
const signupUser = async (req, res) => {
  try {
    const check = await Users.findOne({ email: req.body.email });

    if (check) {
      return res
        .status(400)
        .json({ success: false, error: "Existing User found with this email" });
    }

    let cart = {};
    for (let i = 0; i < 300; i++) {
      cart[i] = 0;
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new Users({
      name: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      cartData: cart,
    });

    await user.save();

    const data = {
      user: {
        id: user.id,
      },
    };

    const token = jwt.sign(data, "secret-ecomm", {
      expiresIn: "1h", // Token expires in 1 hour
    });

    res.json({ success: true, token });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

const loginUser = async (req, res) => {
  try {
    let user = await Users.findOne({ email: req.body.email });

    if (user) {
      const passCompare = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (passCompare) {
        const data = {
          user: {
            id: user.id,
          },
        };
        const token = jwt.sign(data, "secret-ecomm", {
          expiresIn: "1h", // Token expires in 1 hour
        });

        res.json({ success: true, token });
      } else {
        res.json({ success: false, error: "Wrong Password" });
      }
    } else {
      res.json({ success: false, error: "Email Not Found!!" });
    }
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

module.exports = {
  upload,
  uploadImg,
  addProduct,
  deleteProduct,
  getAllProduct,
  signupUser,
  loginUser,
};
