const express = require("express");
const { createPost, updatePost, deletePost } = require("../controllers/postControllers");
const { authGuard, adminGuard } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authGuard, adminGuard, createPost);
router
  .route("/:slug")
  .put(authGuard, adminGuard, updatePost)
  .delete(authGuard, adminGuard, deletePost);

module.exports = router;
