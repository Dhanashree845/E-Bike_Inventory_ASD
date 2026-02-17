const Purchase = require("../models/Purchase");
const Bike = require("../models/Bike");
const StockHistory = require("../models/StockHistory");

// ===============================
// CREATE PURCHASE
// ===============================
const createPurchase = async (req, res) => {
  try {
    const { supplierName, bikeId, quantity, price } = req.body;

    // Basic validation
    if (!supplierName || !bikeId || !quantity || !price) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check if bike exists
    const bike = await Bike.findOne({ bikeId });

    if (!bike) {
      return res.status(404).json({
        success: false,
        message: "Bike not found",
      });
    }

    const totalAmount = Number(quantity) * Number(price);

    // Save purchase record
    const purchase = new Purchase({
      supplierName,
      bikeId,
      quantity: Number(quantity),
      price: Number(price),
      totalAmount,
    });

    const savedPurchase = await purchase.save();

    // Increase bike stock
    bike.stock = (bike.stock || 0) + Number(quantity);
    await bike.save();

    // Save stock history (IN)
    await StockHistory.create({
      bikeId,
      quantity: Number(quantity),
      type: "IN",
      reason: "purchase",
      referenceId: savedPurchase._id,
    });

    return res.status(201).json({
      success: true,
      message: "Purchase recorded successfully",
      data: savedPurchase,
      updatedStock: bike.stock,
    });

  } catch (error) {
    console.error("Create Purchase Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// GET ALL PURCHASES
// ===============================
const getPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: purchases,
    });

  } catch (error) {
    console.error("Get Purchases Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createPurchase,
  getPurchases,
};
