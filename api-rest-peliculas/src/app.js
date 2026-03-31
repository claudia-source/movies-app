const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
cconnectDB().then(() => {
  console.log("Intentando conectar a la BD...");
});;

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ mensaje: 'API funcionando correctamente' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
