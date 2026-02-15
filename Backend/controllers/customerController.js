const Customer = require("../models/Customer");

// POST /api/customers
const createCustomer = async (req, res) => {
    try {
        const customer = new Customer(req.body);
        const savedCustomer = await customer.save();

        res.status(201).json({
            success: true,
            message: "Customer created successfully",
            data: savedCustomer,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// GET /api/customers
const getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.find().populate("purchaseHistory");

        res.status(200).json({
            success: true,
            count: customers.length,
            data: customers,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createCustomer,
    getAllCustomers,
};