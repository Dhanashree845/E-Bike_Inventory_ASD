const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema(
    {
        customer: {
            type: String,
            required: true,
            trim: true,
        },
        bikeId: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            min: 1,
        },
        sellingPrice: {
            type: Number,
            required: true,
        },
        totalAmount: {
            type: Number,
            required: true,
        },
        paymentStatus: {
            type: String,
            enum: ["PAID", "PENDING"],
            default: "PAID",
        },
        paymentMethod: {
            type: String,
            enum: ["CASH", "UPI", "CARD"],
            required: true
        },
        saleDate: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Sale", saleSchema);