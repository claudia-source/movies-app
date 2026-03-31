import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  getMedia,
  updateMedia,
  getGeneros,
  getDirectores,
  getProductoras,
  getTipos
} from "../services/api";

function EditMedia() {

 const { id } = useParams();
const navigate = useNavigate();
navigate("/media");

  const [titulo, setTitulo] = useState("");
  const [genero, setGenero] = useState("");
  const [director, setDirector] = useState("");
  const [productora, setProductora] = useState("");
  const [tipo, setTipo] = useState("");

  const [generos, setGeneros] = useState([]);
  const [directores, setDirectores] = useState([]);
  const [productoras, setProductoras] = useState([]);
  const [tipos, setTipos] = useState([]);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    const resMedia = await getMedia();
    const pelicula = resMedia.data.find(m => m._id === id);

    const resGeneros = await getGeneros();
    const resDirectores = await getDirectores();
    const resProductoras = await getProductoras();
    const resTipos = await getTipos();

    setTitulo(pelicula.titulo);
    setGenero(pelicula.genero?._id);
    setDirector(pelicula.director?._id);
    setProductora(pelicula.productora?._id);
    setTipo(pelicula.tipo?._id);

    setGeneros(resGeneros.data);
    setDirectores(resDirectores.data);
    setProductoras(resProductoras.data);
    setTipos(resTipos.data);
  };

  const actualizar = async () => {
    await updateMedia(id, {
      titulo,
      genero,
      director,
      productora,
      tipo
    });
   }

  return (
    <div className="container mt-4">

      <h2>Editar Película</h2>

      <input
        className="form-control mb-2"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />

      <select className="form-control mb-2" value={genero} onChange={(e) => setGenero(e.target.value)}>
        {generos.map(g => (
          <option key={g._id} value={g._id}>{g.nombre}</option>
        ))}
      </select>

      <select className="form-control mb-2" value={director} onChange={(e) => setDirector(e.target.value)}>
        {directores.map(d => (
          <option key={d._id} value={d._id}>{d.nombre}</option>
        ))}
      </select>

      <select className="form-control mb-2" value={productora} onChange={(e) => setProductora(e.target.value)}>
        {productoras.map(p => (
          <option key={p._id} value={p._id}>{p.nombre}</option>
        ))}
      </select>

      <select className="form-control mb-2" value={tipo} onChange={(e) => setTipo(e.target.value)}>
        {tipos.map(t => (
          <option key={t._id} value={t._id}>{t.nombre}</option>
        ))}
      </select>

      <button className="btn btn-success" onClick={actualizar}>
        Actualizar
      </button>

    </div>
  );
}

export default EditMedia;