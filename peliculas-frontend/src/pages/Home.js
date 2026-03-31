import { useEffect, useState } from "react";
import { getMedia } from "../services/api";
import jhonwickImg from "../images/johnwick.jpg";
import hangoverImg from "../images/hangover.jpg";
import interestellarImg from "../images/interstellar.jpg";
import conjuroImg from "../images/conjuro.jpg";
import planetaImg from "../images/planeta.jpg";
import papermanImg from "../images/paperman.jpg"; 
function Home() {
  const [media, setMedia] = useState([]);

const imagenes = {
    "conjuro.jpg": conjuroImg,
    "johnwick.jpg": jhonwickImg,  
    "hangover.jpg": hangoverImg,
    "interstellar.jpg": interestellarImg,
    "planeta.jpg": planetaImg,
    "paperman.jpg": papermanImg
  };

  useEffect(() => {
    cargar();
  }, []);

  const cargar = async () => {
    const res = await getMedia();
    setMedia(res.data);
  };


  return (
    <div className="home-container">

      {/* 🎬 HEADER */}
      <div className="home-header">
  <h1>🎬 MoviesApp</h1>
  <p>Explora tus películas favoritas</p>

  <button
    className="btn-explorar"
    onClick={() => window.location.href = "/media"}
  >
    🎥 Explorar películas
  </button>
</div>
      {/* 🎞 GRID DE PELÍCULAS */}
      <div className="movie-grid">
        {media.map((m) => (
          <div key={m._id} className="movie-card-simple">
            
            <img
             src={imagenes[m.imagen]}
             alt={m.titulo}
            />

            <div className="overlay-simple">
              <h5>{m.titulo}</h5>
              <p>{m.anio}</p>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}

export default Home;