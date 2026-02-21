const Supplier = require("../models/Supplier");

const createSupplier = async (req, res) => {
    try {
        const supplier = new Supplier(req.body);
        const savedSupplier = await supplier.save();

        res.status(201).json({
            success: true,
            message: "Supplier created successfully",
            data: savedSupplier,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getAllSuppliers = async (req, res) => {
    try {
        const suppliers = await Supplier.find();

        res.status(200).json({
            success: true,
            count: suppliers.length,
            data: suppliers,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const updateSupplier = async (req, res) => {
    try {
        const { id } = req.params;

        const updatedSupplier = await Supplier.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );

        if (!updatedSupplier) {
            return res.status(404).jsosn({
                success: false,
                message: "Supplier not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Supplier updated successfully",
            data: updatedSupplier,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const deleteSupplier = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedSupplier = await Supplier.findByIdAndDelete(id);

        if(!deletedSupplier) {
            return res.status(404).json({
                success: false,
                message: "Supplier not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Supplier deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createSupplier,
    getAllSuppliers,
    updateSupplier,
    deleteSupplier,
};