const Media = require("../models/media");
const Genero = require("../models/genero");
const Director = require("../models/director");
const Productora = require("../models/productora");
const Tipo = require("../models/tipo");

// OBTENER TODAS
const getMedias = async (req, res) => {
  try {
    const medias = await Media.find()
      .populate("genero")
      .populate("director")
      .populate("productora")
      .populate("tipo");

    res.status(200).json(medias);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener las medias",
      error: error.message,
    });
  }
};

// OBTENER POR ID
const getMediaById = async (req, res) => {
  try {
    const { id } = req.params;

    const media = await Media.findById(id)
      .populate("genero")
      .populate("director")
      .populate("productora")
      .populate("tipo");

    if (!media) {
      return res.status(404).json({ mensaje: "Media no encontrada" });
    }

    res.status(200).json(media);

  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener la media",
      error: error.message
    });
  }
};
// CREAR
const postMedia = async (req, res) => {
  try {
    const { titulo, imagen, genero, director, productora, tipo } = req.body;

    const nuevaMedia = new Media({
      titulo,
      imagen,
      genero,
      director,
      productora,
      tipo,
      serial: `MOV-${Date.now()}-${Math.floor(Math.random() * 1000)}`
    });

    await nuevaMedia.save();

    res.status(201).json({
      mensaje: "Media creada correctamente",
      media: nuevaMedia
    });

  } catch (error) {
    res.status(500).json({
      mensaje: "Error al crear la media",
      error: error.message
    });
  }
};
// ACTUALIZAR
const putMedia = async (req, res) => {
  try {
    const { id } = req.params;

    const mediaActualizada = await Media.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!mediaActualizada) {
      return res.status(404).json({ mensaje: "Media no encontrada" });
    }

    res.status(200).json({
      mensaje: "Media actualizada correctamente",
      media: mediaActualizada,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al actualizar la media",
      error: error.message,
    });
  }
};

// ELIMINAR
const deleteMedia = async (req, res) => {
  try {
    const { id } = req.params;

    const mediaEliminada = await Media.findByIdAndDelete(id);

    if (!mediaEliminada) {
      return res.status(404).json({ mensaje: "Media no encontrada" });
    }

    res.status(200).json({
      mensaje: "Media eliminada correctamente",
      media: mediaEliminada,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al eliminar la media",
      error: error.message,
    });
  }
};

module.exports = {
  getMedias,
  getMediaById,
  postMedia,
  putMedia,
  deleteMedia,
};