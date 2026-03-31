const express = require("express");
const router = express.Router();

const {
  getProductoras,
  getProductoraById,
  postProductora,
  putProductora,
  deleteProductora,
} = require("../controllers/productoraController");

router.get("/", getProductoras);
router.get("/:id", getProductoraById);
router.post("/", postProductora);
router.put("/:id", putProductora);
router.delete("/:id", deleteProductora);

module.exports = router;