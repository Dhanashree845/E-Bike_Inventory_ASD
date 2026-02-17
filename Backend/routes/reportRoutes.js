const express = require("express");
const router = express.Router();

const {
    stockSummary,
    salesReport,
    purchaseReport,
    lowStockReport,
} = require("../controllers/reportController");

const { isAuth, isAdmin } = require("../middleware/authMiddleware");

// All reports are ADMIN only
router.get("/stock-summary", isAuth, isAdmin, stockSummary);
router.get("/sales", isAuth, isAdmin, salesReport);
router.get("/purchase", isAuth, isAdmin, purchaseReport);
router.get("/low-stock", isAuth, isAdmin, lowStockReport);

module.exports = router;