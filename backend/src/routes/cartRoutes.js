const express = require("express");
const { requireAuth } = require("../middleware/auth");
const { getCart, addItem, updateItem, removeItem } = require("../controllers/cartController");

const router = express.Router();

router.get("/", requireAuth, getCart);
router.post("/items", requireAuth, addItem);
router.patch("/items/:productId", requireAuth, updateItem);
router.delete("/items/:productId", requireAuth, removeItem);

module.exports = { cartRoutes: router };

