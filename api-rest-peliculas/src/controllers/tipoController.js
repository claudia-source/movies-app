const Tipo = require("../models/Tipo");

const getTipos = async (req, res) => {
  try {
    const tipos = await Tipo.find();
    res.status(200).json(tipos);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener los tipos",
      error: error.message,
    });
  }
};

const getTipoById = async (req, res) => {
  try {
    const { id } = req.params;
    const tipo = await Tipo.findById(id);

    if (!tipo) {
      return res.status(404).json({ mensaje: "Tipo no encontrado" });
    }

    res.status(200).json(tipo);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al buscar el tipo",
      error: error.message,
    });
  }
};

const postTipo = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;

    const existeTipo = await Tipo.findOne({ nombre });
    if (existeTipo) {
      return res.status(400).json({
        mensaje: "Ya existe un tipo con ese nombre",
      });
    }

    const nuevoTipo = new Tipo({ nombre, descripcion });
    await nuevoTipo.save();

    res.status(201).json({
      mensaje: "Tipo creado correctamente",
      tipo: nuevoTipo,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al crear el tipo",
      error: error.message,
    });
  }
};

const putTipo = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;

    const tipoActualizado = await Tipo.findByIdAndUpdate(
      id,
      { nombre, descripcion },
      { new: true, runValidators: true }
    );

    if (!tipoActualizado) {
      return res.status(404).json({ mensaje: "Tipo no encontrado" });
    }

    res.status(200).json({
      mensaje: "Tipo actualizado correctamente",
      tipo: tipoActualizado,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al actualizar el tipo",
      error: error.message,
    });
  }
};

const deleteTipo = async (req, res) => {
  try {
    const { id } = req.params;

    const tipoEliminado = await Tipo.findByIdAndDelete(id);

    if (!tipoEliminado) {
      return res.status(404).json({ mensaje: "Tipo no encontrado" });
    }

    res.status(200).json({
      mensaje: "Tipo eliminado correctamente",
      tipo: tipoEliminado,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al eliminar el tipo",
      error: error.message,
    });
  }
};

module.exports = {
  getTipos,
  getTipoById,
  postTipo,
  putTipo,
  deleteTipo,
};