const mongoose = require("mongoose")

const connectMongoDB = async () => {
  try {
    const connection = await mongoose.connect("mongodb+srv://muhammadshahab48:Shahab74254@testdb.x5p8r3o.mongodb.net/?retryWrites=true&w=majority&appName=TestDB");
    if (connection) {
      console.log(`✅ MongoDB Connected: ${connection.connection.host}`);
    }
  } catch (error) {
    throw new Error(`MongoDB Connection Error: ${error.message}`);
  };
};

module.exports = connectMongoDB