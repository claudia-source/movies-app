const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema({
  titulo: String,

  imagen: String, // 👈 AGREGA ESTA LÍNEA 🔥

  genero: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Genero"
  },

  director: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Director"
  },

  productora: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Productora"
  },

  tipo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tipo"
  }
});

module.exports = mongoose.model("Media", mediaSchema);