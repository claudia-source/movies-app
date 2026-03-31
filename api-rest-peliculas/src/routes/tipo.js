const express = require("express");
const router = express.Router();

const {
  getTipos,
  getTipoById,
  postTipo,
  putTipo,
  deleteTipo,
} = require("../controllers/tipoController");

router.get("/", getTipos);
router.get("/:id", getTipoById);
router.post("/", postTipo);
router.put("/:id", putTipo);
router.delete("/:id", deleteTipo);

module.exports = router;