const { z } = require("zod");
const { Product } = require("../models/Product");

const createSchema = z.object({
  slug: z.string().min(3),
  name: z.string().min(2),
  brand: z.string().min(2),
  category: z.enum(["Skincare", "Makeup", "Haircare", "Fragrance"]),
  price: z.number().min(0),
  images: z.array(z.string().url()).min(1),
  description: z.string().optional(),
  shades: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  isFeatured: z.boolean().optional(),
  stock: z.number().optional(),
});

async function list(req, res, next) {
  try {
    const { q, category, minPrice, maxPrice, brand, featured } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (brand) filter.brand = brand;
    if (featured === "true") filter.isFeatured = true;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const query = q ? { $text: { $search: q }, ...filter } : filter;

    const items = await Product.find(query)
      .sort({ isFeatured: -1, createdAt: -1 })
      .limit(80);

    res.json({ items });
  } catch (err) {
    next(err);
  }
}

async function getById(req, res, next) {
  try {
    const item = await Product.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Product not found" });
    res.json({ item });
  } catch (err) {
    next(err);
  }
}

async function create(req, res, next) {
  try {
    const data = createSchema.parse(req.body);
    const item = await Product.create(data);
    res.status(201).json({ item });
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const data = createSchema.partial().parse(req.body);
    const item = await Product.findByIdAndUpdate(req.params.id, data, { new: true });
    if (!item) return res.status(404).json({ message: "Product not found" });
    res.json({ item });
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    const item = await Product.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Product not found" });
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
}

module.exports = { list, getById, create, update, remove };

