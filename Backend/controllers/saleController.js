const Sale = require("../models/Sale");
const Bike = require("../models/Bike");
const StockHistory = require("../models/StockHistory");
const Customer = require("../models/Customer");

//CREATE SALE
const createSale = async (req, res) => {
    try {
        const { customer, bikeId, quantity, sellingPrice, paymentStatus, paymentMethod } = req.body;

        // Find bike
        const bike = await Bike.findOne({ bikeId });

        if (!bike) {
            return res.status(404).json({
                success: false,
                message: "Bike not found",
            });
        }

        if (bike.stock < quantity) {
            return res.status(400).json({
                success: false,
                message: "Insufficient stock",
            });
        }

        // Create sale
        const sale = new Sale({
            customer,
            bikeId,
            quantity,
            sellingPrice,
            paymentStatus,
            paymentMethod,
            totalAmount: quantity * sellingPrice
        });

        const savedSale = await sale.save();

        // Update bike stock
        bike.stock -= quantity;
        await bike.save();

        // Record stock history 
        await StockHistory.create({
            bikeId,
            quantity,
            type: "OUT",
            reason: "sale",
            referenceId: savedSale._id
        });

        // PUSH sale into customer.purchaseHistory
        const existingCustomer = await Customer.findOne({ name: customer });

        if (existingCustomer) {
            existingCustomer.purchaseHistory.push(savedSale._id);
            await existingCustomer.save();
        }

        res.status(201).json({
            success: true,
            message: "Sale recorded successfully",
            data: sale,
            remainingStock: bike.stock,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createSale,
};