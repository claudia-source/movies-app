const Genero = require("../models/genero");

// GET - listar todos
const getGeneros = async (req, res) => {
  try {
    const generos = await Genero.find();
    res.status(200).json(generos);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener los géneros",
      error: error.message,
    });
  }
};

// GET - buscar por id
const getGeneroById = async (req, res) => {
  try {
    const { id } = req.params;
    const genero = await Genero.findById(id);

    if (!genero) {
      return res.status(404).json({
        mensaje: "Género no encontrado",
      });
    }

    res.status(200).json(genero);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al buscar el género",
      error: error.message,
    });
  }
};

// POST - crear
const postGenero = async (req, res) => {
  try {
    const { nombre, descripcion, estado } = req.body;

    const existeGenero = await Genero.findOne({ nombre });
    if (existeGenero) {
      return res.status(400).json({
        mensaje: "Ya existe un género con ese nombre",
      });
    }

    const nuevoGenero = new Genero({
      nombre,
      descripcion,
      estado,
    });

    await nuevoGenero.save();

    res.status(201).json({
      mensaje: "Género creado correctamente",
      genero: nuevoGenero,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al crear el género",
      error: error.message,
    });
  }
};

// PUT - actualizar
const putGenero = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, estado } = req.body;

    const generoActualizado = await Genero.findByIdAndUpdate(
      id,
      { nombre, descripcion, estado },
      { new: true, runValidators: true }
    );

    if (!generoActualizado) {
      return res.status(404).json({
        mensaje: "Género no encontrado",
      });
    }

    res.status(200).json({
      mensaje: "Género actualizado correctamente",
      genero: generoActualizado,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al actualizar el género",
      error: error.message,
    });
  }
};

// DELETE - eliminar
const deleteGenero = async (req, res) => {
  try {
    const { id } = req.params;

    const generoEliminado = await Genero.findByIdAndDelete(id);

    if (!generoEliminado) {
      return res.status(404).json({
        mensaje: "Género no encontrado",
      });
    }

    res.status(200).json({
      mensaje: "Género eliminado correctamente",
      genero: generoEliminado,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al eliminar el género",
      error: error.message,
    });
  }
};

module.exports = {
  getGeneros,
  getGeneroById,
  postGenero,
  putGenero,
  deleteGenero,
};