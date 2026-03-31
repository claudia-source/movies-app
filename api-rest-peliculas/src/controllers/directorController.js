const Director = require("../models/director");

const getDirectores = async (req, res) => {
  try {
    const directores = await Director.find();
    res.status(200).json(directores);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener los directores",
      error: error.message,
    });
  }
};

const getDirectorById = async (req, res) => {
  try {
    const { id } = req.params;
    const director = await Director.findById(id);

    if (!director) {
      return res.status(404).json({ mensaje: "Director no encontrado" });
    }

    res.status(200).json(director);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al buscar el director",
      error: error.message,
    });
  }
};

const postDirector = async (req, res) => {
  try {
    const { nombres, estado } = req.body;

    const existeDirector = await Director.findOne({ nombres });
    if (existeDirector) {
      return res.status(400).json({
        mensaje: "Ya existe un director con ese nombre",
      });
    }

    const nuevoDirector = new Director({
      nombres,
      estado,
    });

    await nuevoDirector.save();

    res.status(201).json({
      mensaje: "Director creado correctamente",
      director: nuevoDirector,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al crear el director",
      error: error.message,
    });
  }
};

const putDirector = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombres, estado } = req.body;

    const directorActualizado = await Director.findByIdAndUpdate(
      id,
      { nombres, estado },
      { new: true, runValidators: true }
    );

    if (!directorActualizado) {
      return res.status(404).json({ mensaje: "Director no encontrado" });
    }

    res.status(200).json({
      mensaje: "Director actualizado correctamente",
      director: directorActualizado,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al actualizar el director",
      error: error.message,
    });
  }
};

const deleteDirector = async (req, res) => {
  try {
    const { id } = req.params;

    const directorEliminado = await Director.findByIdAndDelete(id);

    if (!directorEliminado) {
      return res.status(404).json({ mensaje: "Director no encontrado" });
    }

    res.status(200).json({
      mensaje: "Director eliminado correctamente",
      director: directorEliminado,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al eliminar el director",
      error: error.message,
    });
  }
};

module.exports = {
  getDirectores,
  getDirectorById,
  postDirector,
  putDirector,
  deleteDirector,
};