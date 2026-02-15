const Purchase = require("../models/Purchase");
const Bike = require("../models/Bike");
const StockHistory = require("../models/StockHistory");

const createPurchase = async (req, res) => {
  try {
    const { supplierName, bikeId, quantity, price } = req.body;

    // Check if bike exists
    const bike = await Bike.findOne({ bikeId });

    if (!bike) {
      return res.status(404).json({
        success: false,
        message: "Bike not found",
      });
    }

    const totalAmount = quantity * price;

    // Save purchase record
    const purchase = new Purchase({
      supplierName,
      bikeId,
      quantity,
      price,
      totalAmount,
    });

    await purchase.save();

    // Increase bike stock
    bike.stock += quantity;
    await bike.save();

    // Save stock history (IN)
    await StockHistory.create({
      bikeId,
      quantity,
      type: "IN",
      reason: "purchase",
    });

    res.status(201).json({
      success: true,
      message: "Purchase recorded successfully",
      data: purchase,
      updatedStock: bike.stock,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createPurchase,
};
