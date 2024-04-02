import mongoose from "mongoose";

const productCategoryScehma = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
  },
  {
    timestamp: true,
  }
);

const Category = mongoose.model("Category", productCategoryScehma);

export default Category;
