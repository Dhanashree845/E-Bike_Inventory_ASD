const mongoose = require("mongoose");

const stockHistorySchema = new mongoose.Schema(
    {
        bikeId: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        type: {
            type: String,
            enum: ["IN", "OUT"],
            required: true,
        },
        reason: {
            type: String,
        },
        referenceId: {
            type: String,
        },
        date: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("StockHistory", stockHistorySchema);