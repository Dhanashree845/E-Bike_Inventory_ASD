const express = require("express");
const router = express.Router();
const StockHistory = require("../models/StockHistory");
const { isAuth } = require("../middleware/authMiddleware");

// ADMIN only
router.get("/", isAuth, async (req, res) => {
  try {
    const history = await StockHistory.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data: history
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
