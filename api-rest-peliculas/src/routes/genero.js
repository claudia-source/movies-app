const express = require("express");
const router = express.Router();

const {
  getGeneros,
  getGeneroById,
  postGenero,
  putGenero,
  deleteGenero,
} = require("../controllers/generoController");

router.get("/", getGeneros);
router.get("/:id", getGeneroById);
router.post("/", postGenero);
router.put("/:id", putGenero);
router.delete("/:id", deleteGenero);

module.exports = router;