const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { CLIENT_ORIGIN } = require("./config/env");
const { notFound, errorHandler } = require("./middleware/errors");

const { authRoutes } = require("./routes/authRoutes");
const { productRoutes } = require("./routes/productRoutes");
const { cartRoutes } = require("./routes/cartRoutes");
const { wishlistRoutes } = require("./routes/wishlistRoutes");
const { orderRoutes } = require("./routes/orderRoutes");
const { suggestionRoutes } = require("./routes/suggestionRoutes");

function createApp() {
  const app = express();

  app.use(
    cors({
      origin: CLIENT_ORIGIN,
      credentials: true,
    })
  );
  app.use(helmet());
  app.use(express.json({ limit: "1mb" }));
  app.use(morgan("dev"));

  app.get("/api/health", (req, res) => res.json({ ok: true }));

  app.use("/api/auth", authRoutes);
  app.use("/api/products", productRoutes);
  app.use("/api/cart", cartRoutes);
  app.use("/api/wishlist", wishlistRoutes);
  app.use("/api/orders", orderRoutes);
  app.use("/api/suggestions", suggestionRoutes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}

module.exports = { createApp };

