const express = require("express");
const router = express.Router();

const {
  getDirectores,
  getDirectorById,
  postDirector,
  putDirector,
  deleteDirector,
} = require("../controllers/directorController");

router.get("/", getDirectores);
router.get("/:id", getDirectorById);
router.post("/", postDirector);
router.put("/:id", putDirector);
router.delete("/:id", deleteDirector);

module.exports = router;