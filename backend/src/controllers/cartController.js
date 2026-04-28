const { z } = require("zod");
const { Product } = require("../models/Product");

const addSchema = z.object({
  productId: z.string().min(1),
  qty: z.number().int().min(1).max(20).default(1),
  shade: z.string().nullable().optional(),
});

const updateSchema = z.object({
  qty: z.number().int().min(1).max(20).optional(),
  shade: z.string().nullable().optional(),
});

async function getCart(req, res) {
  await req.user.populate({ path: "cart.product", select: "name price images brand category" });
  res.json({ cart: req.user.cart });
}

async function addItem(req, res, next) {
  try {
    const data = addSchema.parse(req.body);
    const product = await Product.findById(data.productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const idx = req.user.cart.findIndex((x) => x.product.toString() === data.productId && (x.shade ?? null) === (data.shade ?? null));
    if (idx >= 0) req.user.cart[idx].qty = Math.min(20, req.user.cart[idx].qty + data.qty);
    else req.user.cart.push({ product: product._id, qty: data.qty, shade: data.shade ?? null });

    await req.user.save();
    await req.user.populate({ path: "cart.product", select: "name price images brand category" });
    res.status(201).json({ cart: req.user.cart });
  } catch (err) {
    next(err);
  }
}

async function updateItem(req, res, next) {
  try {
    const data = updateSchema.parse(req.body);
    const productId = req.params.productId;
    const idx = req.user.cart.findIndex((x) => x.product.toString() === productId);
    if (idx < 0) return res.status(404).json({ message: "Cart item not found" });

    if (data.qty !== undefined) req.user.cart[idx].qty = data.qty;
    if (data.shade !== undefined) req.user.cart[idx].shade = data.shade;

    await req.user.save();
    await req.user.populate({ path: "cart.product", select: "name price images brand category" });
    res.json({ cart: req.user.cart });
  } catch (err) {
    next(err);
  }
}

async function removeItem(req, res, next) {
  try {
    const productId = req.params.productId;
    req.user.cart = req.user.cart.filter((x) => x.product.toString() !== productId);
    await req.user.save();
    await req.user.populate({ path: "cart.product", select: "name price images brand category" });
    res.json({ cart: req.user.cart });
  } catch (err) {
    next(err);
  }
}

module.exports = { getCart, addItem, updateItem, removeItem };

