const { z } = require("zod");
const { Product } = require("../models/Product");

const toggleSchema = z.object({ productId: z.string().min(1) });

async function getWishlist(req, res) {
  await req.user.populate({ path: "wishlist", select: "name price images brand category" });
  res.json({ wishlist: req.user.wishlist });
}

async function toggle(req, res, next) {
  try {
    const { productId } = toggleSchema.parse(req.body);
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const exists = req.user.wishlist.some((x) => x.toString() === productId);
    req.user.wishlist = exists ? req.user.wishlist.filter((x) => x.toString() !== productId) : [...req.user.wishlist, product._id];
    await req.user.save();
    await req.user.populate({ path: "wishlist", select: "name price images brand category" });
    res.json({ wishlist: req.user.wishlist });
  } catch (err) {
    next(err);
  }
}

module.exports = { getWishlist, toggle };

