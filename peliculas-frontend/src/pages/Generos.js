import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  getGeneros,
  createGenero,
  updateGenero,
  deleteGenero
} from "../services/api";

function Generos() {

  // 🔹 1. ESTADOS
  const [generos, setGeneros] = useState([]);
  const [nombre, setNombre] = useState("");
  const [idEditar, setIdEditar] = useState(null);

  // 🔹 2. CARGAR DATOS
  useEffect(() => {
    cargarGeneros();
  }, []);

  const cargarGeneros = async () => {
    const res = await getGeneros();
    setGeneros(res.data);
  };

  // 🔹 3. GUARDAR / EDITAR
  const guardarGenero = async () => {
    const data = {
      nombre,
      descripcion: "Sin descripción",
      estado: true
    };

    try {
      if (idEditar) {
        await updateGenero(idEditar, data);
        setIdEditar(null);
        Swal.fire("Actualizado", "Género actualizado correctamente", "success");
      } else {
        await createGenero(data);
        Swal.fire("Guardado", "Género creado correctamente", "success");
      }

      limpiar();
      cargarGeneros();

    } catch (error) {
      Swal.fire("Error", "Ocurrió un problema", "error");
      console.error(error);
    }
  };

  // 🔹 4. ELIMINAR
  const eliminarGenero = async (id) => {
    await deleteGenero(id);
    cargarGeneros();
  };

  // 🔹 5. EDITAR
  const editarGenero = (g) => {
    setNombre(g.nombre);
    setIdEditar(g._id);
  };

  // 🔹 6. LIMPIAR
  const limpiar = () => {
    setNombre("");
    setIdEditar(null);
  };

  // 🔹 7. INTERFAZ
  return (
    <div className="container mt-4">

      <h2>Géneros</h2>

      <input
        className="form-control mb-2"
        placeholder="Nombre del género"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      <button onClick={guardarGenero} className="btn btn-primary mb-3">
        {idEditar ? "Actualizar" : "Guardar"}
      </button>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {generos.map((g) => (
            <tr key={g._id}>
              <td>{g._id}</td>
              <td>{g.nombre}</td>
              <td>
                <button
                  onClick={() => editarGenero(g)}
                  className="btn btn-warning me-2"
                >
                  Editar
                </button>

                <button
                  onClick={() => eliminarGenero(g._id)}
                  className="btn btn-danger"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default Generos;