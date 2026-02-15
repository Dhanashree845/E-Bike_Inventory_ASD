const express = require("express");
const router = express.Router();

const { createPurchase } = require("../controllers/purchaseController");
const { isAuth, isAdmin } = require("../middleware/authMiddleware");

// CREATE purchase (Stock IN)
router.post("/", isAuth, isAdmin, createPurchase);

module.exports = router;
