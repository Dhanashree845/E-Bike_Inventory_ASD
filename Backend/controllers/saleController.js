const Sale = require("../models/Sale");
const Bike = require("../models/Bike");
const StockHistory = require("../models/StockHistory");
const Customer = require("../models/Customer");


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

    
    const qty = Number(quantity);
    const price = Number(sellingPrice);

    
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

    
    bike.stock -= qty;
    await bike.save();

    
    await StockHistory.create({
      bikeId,
      quantity: qty,
      type: "OUT",
      reason: "sale",
      referenceId: savedSale._id
    });

    
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
