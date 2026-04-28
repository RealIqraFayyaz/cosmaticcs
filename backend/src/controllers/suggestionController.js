const { Product } = require("../models/Product");

async function suggestions(req, res, next) {
  try {
    // "AI" mock: infer category preference from cart + wishlist, then recommend featured items.
    const categories = new Map();
    for (const ci of req.user.cart) categories.set(ci.product.toString(), true);

    let preferredCategory = null;
    if (req.user.cart.length) {
      await req.user.populate({ path: "cart.product", select: "category" });
      const counts = {};
      for (const ci of req.user.cart) counts[ci.product.category] = (counts[ci.product.category] ?? 0) + 1;
      preferredCategory = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;
    }

    const query = preferredCategory ? { category: preferredCategory } : {};
    const items = await Product.find(query).sort({ isFeatured: -1, ratingAvg: -1 }).limit(6);

    res.json({
      preferredCategory,
      items,
      rationale:
        preferredCategory
          ? `Based on your cart, you're leaning toward ${preferredCategory}.`
          : "Based on trending textures, here are editorial favorites.",
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { suggestions };

