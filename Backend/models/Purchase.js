const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema(
  {
    supplierName: {
      type: String,
      required: true,
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

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    purchaseDate: {
      type: Date,
      default: Date.now,
    },
    totalAmount: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Purchase", purchaseSchema);
