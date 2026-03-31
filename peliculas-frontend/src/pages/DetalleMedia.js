import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMediaById } from "../services/api";

import jhonwickImg from "../images/johnwick.jpg";
import hangoverImg from "../images/hangover.jpg";
import interestellarImg from "../images/interstellar.jpg";
import conjuroImg from "../images/conjuro.jpg";
import planetaImg from "../images/planeta.jpg";
import papermanImg from "../images/paperman.jpg";

function DetalleMedia() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [media, setMedia] = useState(null);

  const imagenes = {
    "conjuro.jpg": conjuroImg,
    "johnwick.jpg": jhonwickImg,
    "interstellar.jpg": interestellarImg,
    "hangover.jpg": hangoverImg,
    "planeta.jpg": planetaImg,
    "paperman.jpg": papermanImg
  };

  useEffect(() => {
    cargarMedia();
  }, []);

  const cargarMedia = async () => {
    try {
      const res = await getMediaById(id);
      setMedia(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const abrirTrailer = (url) => {
    window.open(url, "_blank");
  };

  if (!media) return <p className="text-white">Cargando...</p>;

  return (
    <div
      className="detalle-container"
      style={{
        backgroundImage: `url(${imagenes[media.imagen]})`
      }}
    >
      <div className="overlay-detalle">

        <button className="btn btn-light mb-4" onClick={() => navigate(-1)}>
          ⬅ Volver
        </button>

        <h1>{media.titulo}</h1>

        <p className="text-muted">
          📅 {media.anio} • 🎬 {media.genero?.nombre} • 📺 {media.tipo?.nombre}
        </p>

        <p className="sinopsis">{media.sinopsis}</p>

        <button
          className="btn btn-danger mt-3"
          onClick={() => abrirTrailer(media.url)}
        >
          ▶ Ver Trailer
        </button>

      </div>
    </div>
  );
}

export default DetalleMedia;