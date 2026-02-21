const Bike = require("../models/Bike");
const Sale = require("../models/Sale");
const Purchase = require("../models/Purchase");


const stockSummary = async (req, res) => {
    try {
        const bikes = await Bike.find();

        const totalProducts = bikes.length;
        const totalStock = bikes.reduce((sum, b) => sum + b.stock, 0);
        const lowStockCount = bikes.filter(
            (b) => b.stock < b.minimumStock
        ).length;

        res.status(200).json({
            success: true,
            totalProducts,
            totalStock,
            lowStockCount,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


const salesReport = async (req, res) => {
    try {
        const { from, to } = req.query;

        const filter = {};
        if (from && to) {
            filter.saleDate = {
                $gte: new Date(from),
                $lte: new Date(to),
            };
        }

        const sales = await Sale.find(filter);

        const totalSalesAmount = sales.reduce(
            (sum, s) => sum + s.totalAmount,
            0
        );

        const totalUnitSold = sales.reduce(
            (sum, s) => sum + s.quantity,
            0
        );

        res.status(200).json({
            success: true,
            totalSalesAmount,
            totalUnitSold,
            totalSales: sales.length,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


const purchaseReport = async (req, res) => {
    try {
        const purchases = await Purchase.find();

        const totalPurchaseAmount = purchases.reduce(
            (sum, p) => sum + p.price * p.quantity,
            0
        );

        res.status(200).json({
            success: true,
            totalPurchases: purchases.length,
            totalPurchaseAmount,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


const lowStockReport = async (req, res) => {
    try {
        const lowStockBikes = await Bike.find({
            $expr: { $lt: ["$stock", "$minimumStock"] },
        });

        res.status(200).json({
            success: true,
            count: lowStockBikes.length,
            bikes: lowStockBikes,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    stockSummary,
    salesReport,
    purchaseReport,
    lowStockReport,
};