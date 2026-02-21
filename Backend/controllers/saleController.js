const Sale = require("../models/Sale");
const Bike = require("../models/Bike");
const StockHistory = require("../models/StockHistory");
const Customer = require("../models/Customer");


<<<<<<< HEAD
=======
// =======================
// CREATE SALE
// =======================
>>>>>>> a3ff7a53c53dd7e0b7aa5b9f75ef0d59099b9b84
const createSale = async (req, res) => {
  try {
    const {
      customer,
      bikeId,
      quantity,
      sellingPrice,
      paymentStatus,
      paymentMethod
    } = req.body;

<<<<<<< HEAD
    
    const qty = Number(quantity);
    const price = Number(sellingPrice);

    
=======
    // Convert to numbers (important!)
    const qty = Number(quantity);
    const price = Number(sellingPrice);

    // Find bike
>>>>>>> a3ff7a53c53dd7e0b7aa5b9f75ef0d59099b9b84
    const bike = await Bike.findOne({ bikeId });

    if (!bike) {
      return res.status(404).json({
        success: false,
        message: "Bike not found"
      });
    }

    if (bike.stock < qty) {
      return res.status(400).json({
        success: false,
        message: "Insufficient stock"
      });
    }

    // Create sale
    const sale = new Sale({
      customer,
      bikeId,
      quantity: qty,
      sellingPrice: price,
      paymentStatus,
      paymentMethod,
      totalAmount: qty * price
    });

    const savedSale = await sale.save();

<<<<<<< HEAD
    
    bike.stock -= qty;
    await bike.save();

    
=======
    // Update bike stock
    bike.stock -= qty;
    await bike.save();

    // Record stock history
>>>>>>> a3ff7a53c53dd7e0b7aa5b9f75ef0d59099b9b84
    await StockHistory.create({
      bikeId,
      quantity: qty,
      type: "OUT",
      reason: "sale",
      referenceId: savedSale._id
    });

<<<<<<< HEAD
    
=======
    // Add sale to customer history (if exists)
>>>>>>> a3ff7a53c53dd7e0b7aa5b9f75ef0d59099b9b84
    const existingCustomer = await Customer.findOne({ name: customer });

    if (existingCustomer) {
      existingCustomer.purchaseHistory.push(savedSale._id);
      await existingCustomer.save();
    }

    res.status(201).json({
      success: true,
      message: "Sale recorded successfully",
      data: savedSale,
      remainingStock: bike.stock
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


<<<<<<< HEAD
=======
// =======================
// GET ALL SALES
// =======================
>>>>>>> a3ff7a53c53dd7e0b7aa5b9f75ef0d59099b9b84
const getSales = async (req, res) => {
  try {
    const sales = await Sale.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: sales
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


module.exports = {
  createSale,
  getSales
};
