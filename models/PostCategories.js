const mongoose = require("mongoose")
const model = mongoose.model;
const Schema = mongoose.Schema;

const PostCategoriesSchema = new Schema(
    {
    title: { type: String, required: true },
    },
    {
      timestamps: true,
    }
  );

const PostCategories = model("PostCategories", PostCategoriesSchema);
module.exports = PostCategories;