const express = require("express");
const {
  createPostCategory,
  getAllPostCategories,
  updatePostCategory,
  deletePostCategory,
} = require("../controllers/postCategoriesControllers");

const { authGuard, adminGuard } = require("../middleware/authMiddleware");

const router = express.Router();

router
  .route("/")
  .post(authGuard, adminGuard, createPostCategory)
  .get(getAllPostCategories);

router
  .route("/:postCategoryId")
  .put(authGuard, adminGuard, updatePostCategory)
  .delete(authGuard, adminGuard, deletePostCategory);
module.exports = router;
