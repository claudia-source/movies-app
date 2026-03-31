require("dotenv").config();
const express = require("express");
const cors = require("cors");

const { getConnection } = require("./src/db/db-connection-mongo");

const app = express();
const port = process.env.PORT || 3000;

getConnection();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    mensaje: "API REST de películas funcionando correctamente",
  });
});

app.use("/api/genero", require("./src/routes/genero"));
app.use("/api/director", require("./src/routes/director"));
app.use("/api/productora", require("./src/routes/productora"));
app.use("/api/tipo", require("./src/routes/tipo"));
app.use("/api/media", require("./src/routes/media"));

app.use((req, res) => {
  res.status(404).json({
    mensaje: "Ruta no encontrada",
  });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});