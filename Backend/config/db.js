const mongoose = require("mongoose");
require("dotenv").config();
const MONGO_URI = process.env.MONGO_URI;

const connect = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connect;
