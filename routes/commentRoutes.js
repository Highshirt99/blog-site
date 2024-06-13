const express = require("express");
const {
  createComment,
  updateComment,
  deleteComment,
  getAllComments,
} = require("../controllers/commentControllers");
const { authGuard, adminGuard } = require("../middleware/authMiddleware");

const router = express.Router();

router
  .route("/")
  .post(authGuard, createComment)
  .get(authGuard, adminGuard, getAllComments);
  
router
  .route("/:commentId")
  .put(authGuard, updateComment)
  .delete(authGuard, deleteComment);

module.exports = router;
