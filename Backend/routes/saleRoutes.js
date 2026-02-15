const express = require("express");
const router = express.Router();

const { createSale } = require("../controllers/saleController");
const { isAuth, isAdmin } = require("../middleware/authMiddleware");

// CREATE sale
router.post("/", isAuth, isAdmin, createSale);

module.exports = router;