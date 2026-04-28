const { z } = require("zod");
const { Order } = require("../models/Order");
const { Product } = require("../models/Product");

const checkoutSchema = z.object({
  shippingAddress: z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().email(),
    address: z.string().min(1),
    city: z.string().min(1),
    zip: z.string().min(1),
  }),
});

async function createFromCart(req, res, next) {
  try {
    const { shippingAddress } = checkoutSchema.parse(req.body);

    if (!req.user.cart.length) return res.status(400).json({ message: "Cart is empty" });

    const productIds = req.user.cart.map((x) => x.product);
    const products = await Product.find({ _id: { $in: productIds } });
    const byId = new Map(products.map((p) => [p._id.toString(), p]));

    const items = req.user.cart.map((ci) => {
      const p = byId.get(ci.product.toString());
      if (!p) {
        const err = new Error("A product in your cart no longer exists.");
        err.statusCode = 400;
        throw err;
      }
      return {
        product: p._id,
        nameSnapshot: p.name,
        imageSnapshot: p.images[0],
        priceSnapshot: p.price,
        qty: ci.qty,
        shade: ci.shade ?? null,
      };
    });

    const subtotal = items.reduce((s, it) => s + it.priceSnapshot * it.qty, 0);
    const shipping = 8;
    const total = subtotal + shipping;

    const order = await Order.create({
      user: req.user._id,
      items,
      subtotal,
      shipping,
      total,
      shippingAddress,
    });

    req.user.cart = [];
    await req.user.save();

    res.status(201).json({ order });
  } catch (err) {
    next(err);
  }
}

async function listMine(req, res, next) {
  try {
    const items = await Order.find({ user: req.user._id }).sort({ createdAt: -1 }).limit(50);
    res.json({ items });
  } catch (err) {
    next(err);
  }
}

async function listAll(req, res, next) {
  try {
    const items = await Order.find({}).sort({ createdAt: -1 }).limit(200).populate("user", "name email role");
    res.json({ items });
  } catch (err) {
    next(err);
  }
}

module.exports = { createFromCart, listMine, listAll };

