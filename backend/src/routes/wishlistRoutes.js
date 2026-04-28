const express = require("express");
const { requireAuth } = require("../middleware/auth");
const { getWishlist, toggle } = require("../controllers/wishlistController");

const router = express.Router();

router.get("/", requireAuth, getWishlist);
router.post("/toggle", requireAuth, toggle);

module.exports = { wishlistRoutes: router };

