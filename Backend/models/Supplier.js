const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        phone: {
            type: String,
            required: true,
        },
        address: {
            type: String,
        },
        productsSupplied: [
            {
                type: String
            }
        ] 
    },
    { timestamps: true } 
);

module.exports = mongoose.model("Supplier", supplierSchema);