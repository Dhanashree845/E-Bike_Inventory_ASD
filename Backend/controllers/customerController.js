const Customer = require("../models/Customer");

<<<<<<< HEAD

const createCustomer = async (req, res) => {
    try {
        
        const existingCustomer = await Customer.findOne({ email: req.body.email });

        if (existingCustomer) {
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });
        }

=======
// POST /api/customers
const createCustomer = async (req, res) => {
    try {
>>>>>>> a3ff7a53c53dd7e0b7aa5b9f75ef0d59099b9b84
        const customer = new Customer(req.body);
        const savedCustomer = await customer.save();

        res.status(201).json({
            success: true,
            message: "Customer created successfully",
            data: savedCustomer,
        });
<<<<<<< HEAD

=======
>>>>>>> a3ff7a53c53dd7e0b7aa5b9f75ef0d59099b9b84
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

<<<<<<< HEAD
=======
// GET /api/customers
>>>>>>> a3ff7a53c53dd7e0b7aa5b9f75ef0d59099b9b84
const getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.find().populate("purchaseHistory");

        res.status(200).json({
            success: true,
            count: customers.length,
            data: customers,
        });
<<<<<<< HEAD

=======
>>>>>>> a3ff7a53c53dd7e0b7aa5b9f75ef0d59099b9b84
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

<<<<<<< HEAD
const updateCustomer = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);

        if (!customer) {
            return res.status(404).json({
                success: false,
                message: "Customer not found"
            });
        }

        
        if (req.body.email && req.body.email !== customer.email) {
            const existingEmail = await Customer.findOne({ email: req.body.email });

            if (existingEmail) {
                return res.status(400).json({
                    success: false,
                    message: "Email already exists"
                });
            }
        }

        const updatedCustomer = await Customer.findByIdAndUpdate(
            req.params.id,
=======
// PUT /api/customers/:id
const updateCustomer = async (req, res) => {
    try {
        const { id } = req.params;

        const updatedCustomer = await Customer.findByIdAndUpdate(
            id,
>>>>>>> a3ff7a53c53dd7e0b7aa5b9f75ef0d59099b9b84
            req.body,
            { new: true, runValidators: true }
        );

<<<<<<< HEAD
=======
        if (!updatedCustomer) {
            return res.status(404).json({
                success: false,
                message: "Customer not found",
            });
        }

>>>>>>> a3ff7a53c53dd7e0b7aa5b9f75ef0d59099b9b84
        res.status(200).json({
            success: true,
            message: "Customer updated successfully",
            data: updatedCustomer,
        });
<<<<<<< HEAD

=======
>>>>>>> a3ff7a53c53dd7e0b7aa5b9f75ef0d59099b9b84
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

<<<<<<< HEAD
const deleteCustomer = async (req, res) => {
    try {
        const customer = await Customer.findByIdAndDelete(req.params.id);

        if (!customer) {
            return res.status(404).json({
                success: false,
                message: "Customer not found"
=======
// DELETE /api/customers/:id
const deleteCustomer = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedCustomer = await Customer.findByIdAndDelete(id);

        if (!deletedCustomer) {
            return res.status(404).json({
                success: false,
                message: "Customer not found",
>>>>>>> a3ff7a53c53dd7e0b7aa5b9f75ef0d59099b9b84
            });
        }

        res.status(200).json({
            success: true,
<<<<<<< HEAD
            message: "Customer deleted successfully"
        });

=======
            message: "Customer deleted successfully",
        });
>>>>>>> a3ff7a53c53dd7e0b7aa5b9f75ef0d59099b9b84
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

<<<<<<< HEAD

=======
>>>>>>> a3ff7a53c53dd7e0b7aa5b9f75ef0d59099b9b84
module.exports = {
    createCustomer,
    getAllCustomers,
    updateCustomer,
    deleteCustomer,
<<<<<<< HEAD
};
=======
};
>>>>>>> a3ff7a53c53dd7e0b7aa5b9f75ef0d59099b9b84
