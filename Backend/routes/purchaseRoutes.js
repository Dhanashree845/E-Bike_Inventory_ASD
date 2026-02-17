const express = require("express");
const router = express.Router();

const { createPurchase, getPurchases } = require("../controllers/purchaseController");
const { isAuth, isAdmin } = require("../middleware/authMiddleware");

// CREATE purchase
router.post("/", isAuth, isAdmin, createPurchase);

// GET all purchases
router.get("/", isAuth, isAdmin, getPurchases);

module.exports = router;
