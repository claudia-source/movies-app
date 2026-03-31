import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  getProductoras,
  createProductoras,
  updateProductoras,
  deleteProductoras
} from "../services/api";

function Productoras() {

  const [productoras, setProductoras] = useState([]);
  const [nombre, setNombre] = useState("");
  const [idEditar, setIdEditar] = useState(null);

  useEffect(() => {
    cargarProductoras();
  }, []);

  const cargarProductoras = async () => {
    const res = await getProductoras();
    setProductoras(res.data);
  };

  const guardarProductora = async () => {
    if (idEditar) {
      await updateProductoras(idEditar, { nombre });
      setIdEditar(null);
    } else {
      await createProductoras({ nombre });
    }
    setNombre("");
    cargarProductoras();
  };

  const eliminarProductora = async (id) => {
    await deleteProductoras(id);
    cargarProductoras();
  };

  const editarProductora = (p) => {
    setNombre(p.nombre);
    setIdEditar(p._id);
  };

  return (
    <div className="container mt-4">
      <h2>Productoras</h2>

      <input
        className="form-control mb-2"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      <button className="btn btn-primary mb-3" onClick={guardarProductora}>
        {idEditar ? "Actualizar" : "Guardar"}
      </button>

      <table className="table">
        <tbody>
          {productoras.map((p) => (
            <tr key={p._id}>
              <td>{p.nombre}</td>
              <td>
                <button onClick={() => editarProductora(p)} className="btn btn-warning me-2">Editar</button>
                <button onClick={() => eliminarProductora(p._id)} className="btn btn-danger">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Productoras;