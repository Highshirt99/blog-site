const express = require("express");
const {
  createComment
} = require("../controllers/commentControllers");
const { authGuard } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authGuard,  createComment);


module.exports = router;
