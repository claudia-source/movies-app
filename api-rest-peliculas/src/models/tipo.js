// src/models/tipo.js
const mongoose = require('mongoose');

const tipoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  descripcion: {
    type: String,
    default: ''
  }
}, { timestamps: true });

module.exports = mongoose.model('Tipo', tipoSchema);