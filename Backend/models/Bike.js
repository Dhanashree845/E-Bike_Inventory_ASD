const mongoose = require("mongoose");

const bikeSchema = new mongoose.Schema(
    {
        bikeId: {
            type: String,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        brand: {
            type: String,
            required: true,
        },
        model: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        stock: {
            type: Number,
            required: true,
            min: 0,
        },
        minimumStock: {
            type: Number,
            required: true,
            default: 5,
        },
        batteryCapacity: {
            type: String,
            required: true,
        },
        rangeKm: {
            type: Number,
        },
        warrantyMonths: {
            type: Number,
        },
        image: {
            type: String,
        },
        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Bike", bikeSchema);