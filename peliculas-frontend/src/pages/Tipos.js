import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  getTipos,
  createTipos,
  updateTipos,
  deleteTipos
} from "../services/api";

function Tipos() {

  const [tipos, setTipos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [idEditar, setIdEditar] = useState(null);

  useEffect(() => {
    cargarTipos();
  }, []);

  const cargarTipos = async () => {
    const res = await getTipos();
    setTipos(res.data);
  };

  const guardarTipo = async () => {
    if (idEditar) {
      await updateTipos(idEditar, { nombre });
      setIdEditar(null);
    } else {
    await createTipos({ nombre });
    }
    setNombre("");
    cargarTipos();
  };

  const eliminarTipo = async (id) => {
    await deleteTipos(id);
    cargarTipos();
  };

  const editarTipo = (t) => {
    setNombre(t.nombre);
    setIdEditar(t._id);
  };

  return (
    <div className="container mt-4">
      <h2>Tipos</h2>

      <input
        className="form-control mb-2"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      <button className="btn btn-primary mb-3" onClick={guardarTipo}>
        {idEditar ? "Actualizar" : "Guardar"}
      </button>

      <table className="table">
        <tbody>
          {tipos.map((t) => (
            <tr key={t._id}>
              <td>{t.nombre}</td>
              <td>
                <button onClick={() => editarTipo(t)} className="btn btn-warning me-2">Editar</button>
                <button onClick={() => eliminarTipo(t._id)} className="btn btn-danger">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Tipos;