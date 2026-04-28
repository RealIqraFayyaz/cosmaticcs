const express = require("express");
const { requireAuth, requireRole } = require("../middleware/auth");
const { createFromCart, listMine, listAll } = require("../controllers/orderController");

const router = express.Router();

router.post("/", requireAuth, createFromCart);
router.get("/mine", requireAuth, listMine);
router.get("/", requireAuth, requireRole("admin"), listAll);

module.exports = { orderRoutes: router };

