import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  getDirectores,
  createDirectores,
  updateDirectores,
  deleteDirectores
} from "../services/api";

function Directores() {

  const [directores, setDirectores] = useState([]);
  const [nombre, setNombre] = useState("");
  const [idEditar, setIdEditar] = useState(null);

  useEffect(() => {
    cargarDirectores();
  }, []);

  const cargarDirectores = async () => {
    const res = await getDirectores();
    setDirectores(res.data);
  };

  const guardarDirector = async () => {
  const data = {
    nombre,
    estado: true
  };

  try {
    if (idEditar) {
      await updateDirectores(idEditar, data);
    } else {
      console.log("DATA ENVIADA:", data);
      await createDirectores(data);
    }

    cargarDirectores();
  } catch (error) {
  console.log("ERROR COMPLETO:", error);
  console.log("ERROR RESPONSE:", error.response);
  console.log("ERROR DATA:", error.response?.data);
}
};

  const eliminarDirector = async (id) => {
    await deleteDirectores(id);
    cargarDirectores();
  };

  const editarDirector = (d) => {
    setNombre(d.nombre);
    setIdEditar(d._id);
  };

  return (
    <div className="container mt-4">
      <h2>Directores</h2>

      <input
        className="form-control mb-2"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Nombre del director"
      />

      <button className="btn btn-primary mb-3" onClick={guardarDirector}>
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
          {directores.map((d) => (
            <tr key={d._id}>
              <td>{d._id}</td>
              <td>{d.nombres}</td>
              <td>
                <button className="btn btn-warning me-2" onClick={() => editarDirector(d)}>
                  Editar
                </button>
                <button className="btn btn-danger" onClick={() => eliminarDirector(d._id)}>
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

export default Directores;