const Supplier = require("../models/Supplier");

<<<<<<< HEAD
=======
// CREATE supplier
>>>>>>> a3ff7a53c53dd7e0b7aa5b9f75ef0d59099b9b84
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

<<<<<<< HEAD
=======
// GET all suppliers
>>>>>>> a3ff7a53c53dd7e0b7aa5b9f75ef0d59099b9b84
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

<<<<<<< HEAD
=======
// UPDATE supplier by ID
>>>>>>> a3ff7a53c53dd7e0b7aa5b9f75ef0d59099b9b84
const updateSupplier = async (req, res) => {
    try {
        const { id } = req.params;

        const updatedSupplier = await Supplier.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );

        if (!updatedSupplier) {
<<<<<<< HEAD
            return res.status(404).jsosn({
=======
            return res.status(404).json({
>>>>>>> a3ff7a53c53dd7e0b7aa5b9f75ef0d59099b9b84
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

<<<<<<< HEAD
=======
// DELETE supplier by ID
>>>>>>> a3ff7a53c53dd7e0b7aa5b9f75ef0d59099b9b84
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