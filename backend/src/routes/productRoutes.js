const express = require("express");
const { list, getById, create, update, remove } = require("../controllers/productController");
const { requireAuth, requireRole } = require("../middleware/auth");

const router = express.Router();

router.get("/", list);
router.get("/:id", getById);
router.post("/", requireAuth, requireRole("admin"), create);
router.put("/:id", requireAuth, requireRole("admin"), update);
router.delete("/:id", requireAuth, requireRole("admin"), remove);

module.exports = { productRoutes: router };

