require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log(`connection with DB successfull`);
  } catch (err) {
    console.log(`could not connect to DB. Error: ${err}`);
  }
};

module.exports = { connectDB }