const Productora = require("../models/Productora");

const getProductoras = async (req, res) => {
  try {
    const productoras = await Productora.find();
    res.status(200).json(productoras);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener las productoras",
      error: error.message,
    });
  }
};

const getProductoraById = async (req, res) => {
  try {
    const { id } = req.params;
    const productora = await Productora.findById(id);

    if (!productora) {
      return res.status(404).json({ mensaje: "Productora no encontrada" });
    }

    res.status(200).json(productora);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al buscar la productora",
      error: error.message,
    });
  }
};

const postProductora = async (req, res) => {
  try {
    const { nombre, estado, slogan, descripcion } = req.body;

    const existeProductora = await Productora.findOne({ nombre });
    if (existeProductora) {
      return res.status(400).json({
        mensaje: "Ya existe una productora con ese nombre",
      });
    }

    const nuevaProductora = new Productora({
      nombre,
      estado,
      slogan,
      descripcion,
    });

    await nuevaProductora.save();

    res.status(201).json({
      mensaje: "Productora creada correctamente",
      productora: nuevaProductora,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al crear la productora",
      error: error.message,
    });
  }
};

const putProductora = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, estado, slogan, descripcion } = req.body;

    const productoraActualizada = await Productora.findByIdAndUpdate(
      id,
      { nombre, estado, slogan, descripcion },
      { new: true, runValidators: true }
    );

    if (!productoraActualizada) {
      return res.status(404).json({ mensaje: "Productora no encontrada" });
    }

    res.status(200).json({
      mensaje: "Productora actualizada correctamente",
      productora: productoraActualizada,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al actualizar la productora",
      error: error.message,
    });
  }
};

const deleteProductora = async (req, res) => {
  try {
    const { id } = req.params;

    const productoraEliminada = await Productora.findByIdAndDelete(id);

    if (!productoraEliminada) {
      return res.status(404).json({ mensaje: "Productora no encontrada" });
    }

    res.status(200).json({
      mensaje: "Productora eliminada correctamente",
      productora: productoraEliminada,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al eliminar la productora",
      error: error.message,
    });
  }
};

module.exports = {
  getProductoras,
  getProductoraById,
  postProductora,
  putProductora,
  deleteProductora,
};