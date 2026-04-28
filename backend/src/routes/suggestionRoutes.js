const express = require("express");
const { requireAuth } = require("../middleware/auth");
const { suggestions } = require("../controllers/suggestionController");

const router = express.Router();

router.get("/", requireAuth, suggestions);

module.exports = { suggestionRoutes: router };

