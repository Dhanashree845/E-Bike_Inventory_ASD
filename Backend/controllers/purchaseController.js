const Purchase = require("../models/Purchase");
const Bike = require("../models/Bike");
const StockHistory = require("../models/StockHistory");

<<<<<<< HEAD

=======
// ===============================
// CREATE PURCHASE
// ===============================
>>>>>>> a3ff7a53c53dd7e0b7aa5b9f75ef0d59099b9b84
const createPurchase = async (req, res) => {
  try {
    const { supplierName, bikeId, quantity, price } = req.body;

<<<<<<< HEAD
    
=======
    // Basic validation
>>>>>>> a3ff7a53c53dd7e0b7aa5b9f75ef0d59099b9b84
    if (!supplierName || !bikeId || !quantity || !price) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

<<<<<<< HEAD
   
=======
    // Check if bike exists
>>>>>>> a3ff7a53c53dd7e0b7aa5b9f75ef0d59099b9b84
    const bike = await Bike.findOne({ bikeId });

    if (!bike) {
      return res.status(404).json({
        success: false,
        message: "Bike not found",
      });
    }

    const totalAmount = Number(quantity) * Number(price);

<<<<<<< HEAD
    
=======
    // Save purchase record
>>>>>>> a3ff7a53c53dd7e0b7aa5b9f75ef0d59099b9b84
    const purchase = new Purchase({
      supplierName,
      bikeId,
      quantity: Number(quantity),
      price: Number(price),
      totalAmount,
    });

    const savedPurchase = await purchase.save();

<<<<<<< HEAD
    
=======
    // Increase bike stock
>>>>>>> a3ff7a53c53dd7e0b7aa5b9f75ef0d59099b9b84
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

<<<<<<< HEAD
=======
// ===============================
// GET ALL PURCHASES
// ===============================
>>>>>>> a3ff7a53c53dd7e0b7aa5b9f75ef0d59099b9b84
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

<<<<<<< HEAD
module.exports = {
  createPurchase,
  getPurchases,
=======
// ===============================
// DELETE PURCHASE
// ===============================
const deletePurchase = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPurchase = await Purchase.findByIdAndDelete(id);

    if (!deletedPurchase) {
      return res.status(404).json({
        success: false,
        message: "Purchase not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Purchase deleted successfully",
    });

  } catch (error) {
    console.error("Delete Purchase Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createPurchase,
  getPurchases,
  deletePurchase,
>>>>>>> a3ff7a53c53dd7e0b7aa5b9f75ef0d59099b9b84
};
