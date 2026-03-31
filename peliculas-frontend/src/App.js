import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Generos from "./pages/Generos";
import Directores from "./pages/Directores";
import Productoras from "./pages/Productoras";
import Tipos from "./pages/Tipos";
import Media from "./pages/Media";
import EditMedia from "./pages/EditMedia";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/generos" element={<Generos />} />
        <Route path="/directores" element={<Directores />} />
        <Route path="/productoras" element={<Productoras />} />
        <Route path="/tipos" element={<Tipos />} />
        <Route path="/media" element={<Media />} />
        <Route path="/editar-media/:id" element={<EditMedia />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;