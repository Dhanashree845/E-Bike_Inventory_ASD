const express = require("express");
const router = express.Router();

const { createPurchase, getPurchases, deletePurchase } = require("../controllers/purchaseController");
const { isAuth, isAdmin } = require("../middleware/authMiddleware");

// CREATE purchase
router.post("/", isAuth, isAdmin, createPurchase);

// GET all purchases
router.get("/", isAuth, isAdmin, getPurchases);

// DELETE purchase by ID
router.delete("/:id", isAuth, isAdmin, deletePurchase);

module.exports = router;
