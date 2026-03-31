import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import jhonwickImg from "../images/johnwick.jpg";
import hangoverImg from "../images/hangover.jpg";
import interestellarImg from "../images/interstellar.jpg";
import conjuroImg from "../images/conjuro.jpg";
import planetaImg from "../images/planeta.jpg";
import papermanImg from "../images/paperman.jpg";
import { motion } from "framer-motion";

import {
  getMedia,
  createMedia,
  deleteMedia,
  updateMedia,
  getGeneros,
  getDirectores,
  getProductoras,
  getTipos
} from "../services/api";

function Media() {
  const [media, setMedia] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [directores, setDirectores] = useState([]);
  const [productoras, setProductoras] = useState([]);
  const [tipos, setTipos] = useState([]);

  const [titulo, setTitulo] = useState("");
  const [genero, setGenero] = useState("");
  const [director, setDirector] = useState("");
  const [productora, setProductora] = useState("");
  const [tipo, setTipo] = useState("");
  const [idEditar, setIdEditar] = useState(null);

  const [sinopsis, setSinopsis] = useState("");
  const [url, setUrl] = useState("");
  const [imagen, setImagen] = useState("");
  const [anio, setAnio] = useState("");

  const [busqueda, setBusqueda] = useState("");
  const [filtroGenero, setFiltroGenero] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("");

  const imagenes = {
    "conjuro.jpg": conjuroImg,
    "johnwick.jpg": jhonwickImg,
    "interstellar.jpg": interestellarImg,
    "hangover.jpg": hangoverImg,
    "planeta.jpg": planetaImg,
    "paperman.jpg": papermanImg
  };

  useEffect(() => {
    cargarTodo();
  }, []);

  const cargarTodo = async () => {
    try {
      const resMedia = await getMedia();
      const resGeneros = await getGeneros();
      const resDirectores = await getDirectores();
      const resProductoras = await getProductoras();
      const resTipos = await getTipos();

      setMedia(resMedia.data);
      setGeneros(resGeneros.data);
      setDirectores(resDirectores.data);
      setProductoras(resProductoras.data);
      setTipos(resTipos.data);
    } catch (error) {
      console.error(error);
    }
  };

  const guardarMedia = async () => {
    if (!titulo || !genero || !director || !productora || !tipo) {
      return Swal.fire("Error", "Completa todos los campos", "warning");
    }

    const data = {
      titulo,
      sinopsis,
      url,
      imagen,
      anio,
      genero,
      director,
      productora,
      tipo
    };

    try {
      if (idEditar) {
        await updateMedia(idEditar, data);
        Swal.fire("Actualizado", "Película actualizada", "success");
      } else {
        await createMedia(data);
        Swal.fire("Guardado", "Película creada", "success");
      }

      limpiar();
      cargarTodo();
    } catch (error) {
      Swal.fire("Error", "Ocurrió un problema", "error");
    }
  };

  const limpiar = () => {
  setTitulo("");
  setSinopsis("");
  setUrl("");
  setImagen("");
  setAnio("");
  setGenero("");
  setDirector("");
  setProductora("");
  setTipo("");
};

const editarMedia = (m) => {
  setIdEditar(m._id);
  setTitulo(m.titulo);
  setSinopsis(m.sinopsis);
  setUrl(m.url);
  setImagen(m.imagen);
  setAnio(m.anio);
  setGenero(m.genero?._id);
  setDirector(m.director?._id);
  setProductora(m.productora?._id);
  setTipo(m.tipo?._id);

  window.scrollTo({ top: 0, behavior: "smooth" });
};

const eliminarMediaItem = async (id) => {
  const result = await Swal.fire({
    title: "¿Eliminar?",
    text: "No podrás recuperar esta película",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar"
  });

  if (result.isConfirmed) {
    await deleteMedia(id);
    cargarTodo();
    Swal.fire("Eliminado", "Película eliminada", "success");
  }
};
const abrirTrailer = (url) => {
  if (!url) return;

  let embedUrl = url;

  if (url.includes("watch?v=")) {
    embedUrl = url.replace("watch?v=", "embed/");
  }

  setTrailer(embedUrl);
  setMostrarModal(true);
};

const [trailer, setTrailer] = useState("");
const [mostrarModal, setMostrarModal] = useState(false);

  return (
  <div className="container mt-4">

    {/* FORMULARIO */}
    <div className="card p-4 mb-4 bg-dark text-white">
      <h4>{idEditar ? "✏️ Editar película" : "🎬 Gestión de Películas"}</h4>

      <input
        type="text"
        className="form-control mb-2"
        placeholder="Título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />

      <textarea
        className="form-control mb-2"
        placeholder="Sinopsis"
        value={sinopsis}
        onChange={(e) => setSinopsis(e.target.value)}
      />

      <input
        type="text"
        className="form-control mb-2"
        placeholder="URL del trailer (YouTube)"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <select
        className="form-control mb-2"
        value={imagen}
        onChange={(e) => setImagen(e.target.value)}
      >
        <option value="">Selecciona imagen</option>
        <option value="conjuro.jpg">El Conjuro</option>
        <option value="johnwick.jpg">John Wick</option>
        <option value="interstellar.jpg">Interstellar</option>
        <option value="hangover.jpg">¿Qué pasó ayer?</option>
        <option value="planeta.jpg">Nuestro Planeta</option>
        <option value="paperman.jpg">Paperman</option>
      </select>

      <input
        type="number"
        className="form-control mb-2"
        placeholder="Año"
        value={anio}
        onChange={(e) => setAnio(e.target.value)}
      />

      <select className="form-control mb-2" value={genero} onChange={(e) => setGenero(e.target.value)}>
        <option value="">Seleccione Género</option>
        {generos.map(g => (
          <option key={g._id} value={g._id}>{g.nombre}</option>
        ))}
      </select>

      <select className="form-control mb-2" value={director} onChange={(e) => setDirector(e.target.value)}>
        <option value="">Seleccione Director</option>
        {directores.map(d => (
          <option key={d._id} value={d._id}>{d.nombres}</option>
        ))}
      </select>

      <select className="form-control mb-2" value={productora} onChange={(e) => setProductora(e.target.value)}>
        <option value="">Seleccione Productora</option>
        {productoras.map(p => (
          <option key={p._id} value={p._id}>{p.nombre}</option>
        ))}
      </select>

      <select className="form-control mb-3" value={tipo} onChange={(e) => setTipo(e.target.value)}>
        <option value="">Seleccione Tipo</option>
        {tipos.map(t => (
          <option key={t._id} value={t._id}>{t.nombre}</option>
        ))}
      </select>

      <button className="btn btn-danger" onClick={guardarMedia}>
        {idEditar ? "Actualizar" : "Crear"}
      </button>
    </div>

    {/* GRID DE PELÍCULAS */}
    <div className="row">
      {media.map((m) => (
        <div className="col-md-4 col-lg-3 mb-4" key={m._id}>

          <motion.div
            className="movie-card"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={imagenes[m.imagen]}
              alt={m.titulo}
              className="movie-img"
            />

            <div className="overlay">
              <h5>{m.titulo}</h5>
              <p>📅 {m.anio}</p>

              <div className="buttons">

                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => editarMedia(m)}
                >
                  ✏️
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => eliminarMediaItem(m._id)}
                >
                  🗑
                </button>

                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => window.open(m.url, "_blank")}
                >
                  ▶
                </button>

              </div>
            </div>

          </motion.div>

        </div>
      ))}
    </div>

  </div>
);
}
 export default Media; 