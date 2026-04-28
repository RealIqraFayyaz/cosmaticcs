const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, enum: ["Skincare", "Makeup", "Haircare", "Fragrance"], required: true },
    price: { type: Number, required: true, min: 0 },
    currency: { type: String, default: "USD" },
    images: [{ type: String, required: true }],
    description: { type: String, default: "" },
    shades: [{ type: String }],
    tags: [{ type: String }],
    ratingAvg: { type: Number, default: 4.7 },
    ratingCount: { type: Number, default: 128 },
    isFeatured: { type: Boolean, default: false },
    stock: { type: Number, default: 999 },
  },
  { timestamps: true }
);

ProductSchema.index({ name: "text", brand: "text", category: "text", tags: "text" });

const Product = mongoose.model("Product", ProductSchema);

module.exports = { Product };

