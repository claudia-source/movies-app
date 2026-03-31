import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMediaById } from "../services/api";

function VerMedia() {

  const { id } = useParams();
  const [media, setMedia] = useState(null);

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

  if (!media) return <p className="text-center mt-5">Cargando...</p>;

  return (
    <div className="container mt-5">

      <div className="card p-4 shadow">

        <div className="row">

          {/* 🎬 IMAGEN */}
          <div className="col-md-4">
            <img
              src={media.imagen || "https://via.placeholder.com/400x500"}
              className="img-fluid rounded"
              alt={media.titulo}
            />
          </div>

          {/* 📄 INFORMACIÓN */}
          <div className="col-md-8">

            <h1 className="mb-3">{media.titulo}</h1>

            <p><strong>🎭 Género:</strong> {media.genero?.nombre}</p>
            <p><strong>🎬 Director:</strong> {media.director?.nombres}</p>
            <p><strong>🏢 Productora:</strong> {media.productora?.nombre}</p>
            <p><strong>📺 Tipo:</strong> {media.tipo?.nombre}</p>
            <p><strong>📅 Año:</strong> {media.anioEstreno || "No disponible"}</p>

            <hr />

            <h5>📖 Sinopsis</h5>
            <p>{media.sinopsis || "Sin descripción disponible"}</p>

          </div>

        </div>

        {/* 🎥 TRAILER */}
        {media.url && (
          <div className="mt-4">
            <h4>🎥 Trailer</h4>

            <div className="ratio ratio-16x9">
              <iframe
                src={media.url.replace("watch?v=", "embed/")}
                title="Trailer"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}

export default VerMedia;