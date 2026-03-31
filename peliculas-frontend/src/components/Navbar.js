import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-dark px-4">

      {/* LOGO */}
      <span className="navbar-brand">🎬 MoviesApp</span>

      {/* BOTÓN RESPONSIVE */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* MENÚ */}
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">

          <li className="nav-item">
            <Link className="nav-link" to="/">Inicio</Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/media">Películas</Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/generos">Géneros</Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/tipos">Tipos</Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/productoras">Productoras</Link>
          </li>

        </ul>
      </div>

    </nav>
  );
}

export default Navbar;