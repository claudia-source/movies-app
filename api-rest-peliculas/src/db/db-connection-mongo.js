const mongoose = require("mongoose");

const getConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Base de datos conectada");
  } catch (error) {
    console.log("Error de conexión:", error.message);
  }
};

module.exports = { getConnection };