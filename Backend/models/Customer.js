const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
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
        },
        phone: {
            type: String,
            required: true,
        },
        address: {
            type: String,
        },
        bikeModel: {
            type: String,
        },
        purchaseHistory: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Sale",
            },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Customer", customerSchema);