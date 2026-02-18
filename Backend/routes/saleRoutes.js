const express = require("express");
const router = express.Router();

const { createSale, getSales } = require("../controllers/saleController");
const { isAuth, isAdmin } = require("../middleware/authMiddleware");

// GET all sales
router.get("/", isAuth,getSales);

// CREATE sale
router.post("/", isAuth,createSale);

module.exports = router;
