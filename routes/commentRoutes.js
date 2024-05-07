const express = require("express");
const {
  createComment,
  updateComment,
  deleteComment
} = require("../controllers/commentControllers");
const { authGuard } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authGuard,  createComment);
router.route("/:commentId").put(authGuard,  updateComment).delete(authGuard,  deleteComment);


module.exports = router;
