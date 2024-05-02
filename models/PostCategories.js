const model = mongoose.model;
const Schema = mongoose.Schema;

const PostCategoriesSchema = new Schema(
    {
    name: { type: String, required: true },
    },
    {
      timestamps: true,
    }
  );

const PostCategories = model("PostCategories", PostCategoriesSchema);
module.exports = PostCategories;