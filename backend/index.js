const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const uploadRoutes = require("./routes/users.js");

app.use(express.json());
app.use(cors());

// DB Connection
mongoose.connect(
  "mongodb+srv://adeshjadhav103:9wTfBf7JTUD7TsEO@cluster0.ljoup18.mongodb.net/e-commerce"
);

app.use(uploadRoutes);

// API Creation
app.get("/", (req, res) => {
  res.send("Express App is running");
});


// Image Storage Engine 
// Static is Middleware 
app.use("/images", express.static("upload/images"));


// add product

app.listen(port, (error) => {
  if (!error) {
    console.log("Server Running on Port " + port);
  } else {
    console.log("Error " + error);
  }
});
