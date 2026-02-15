const express = require("express");
const router = express.Router();
const { isAuth, isAdmin } = require("../middleware/authMiddleware");

const { createBike,
    getAllBikes,
    getBikeById,
    updateBike,
    deleteBike,
    updateBikeByBikeId,
    deleteBikeByBikeId,
    getLowStockBikes,
    sellBike,
    getInventoryStats,
    getStockHistory,
    stockInBike,
    stockOutBike,
    getStockHistoryByBikeId,
} = require("../controllers/bikeController");

// CREATE
const upload = require("../config/upload");

router.post(
    "/",
    isAuth,
    isAdmin,
    upload.single("image"),
    createBike
);

// READ
router.get("/", isAuth, getAllBikes); //PUBLIC (any logged-in useer)
router.get("/low-stock", getLowStockBikes);
router.get("/stats", getInventoryStats);
router.get("/stock-history", getStockHistory);
router.get("/stock/history/:productId", getStockHistoryByBikeId);
router.get("/:id", getBikeById);

// UPDATE
router.put("/sell/:bikeId", sellBike);
router.put("/stock-in/:bikeId", stockInBike);
router.put("/stock-out/:bikeId", stockOutBike);
router.put("/:id", isAuth, isAdmin, updateBike);

// UPDATE by bikeId
router.put("/by-bikeId/:bikeId", isAuth, isAdmin, updateBikeByBikeId);

// DELETE
router.delete("/:id", isAuth, isAdmin, deleteBike);

// DELETE by bikeId
router.delete("/by-bikeId/:bikeId", isAuth, isAdmin, deleteBikeByBikeId);



module.exports = router;