const path = require("path");
const Bike = require("../models/Bike");
const StockHistory = require("../models/StockHistory");

//CREATE : Add new E-Bike
const createBike = async (req, res) => {
  try {
    const bikeData = {
      ...req.body,
      image: req.file ? `/uploads/${req.file.filename}` : null,
    };

    const bike = new Bike(bikeData);
    const savedBike = await bike.save();

    res.status(201).json({
      success: true,
      message: "E-Bike added successfully",
      data: savedBike,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// READ : Get all E-Bikes
const getAllBikes = async (req, res) => {
    try {
        let filter = {};
        let sortOption = {};

        if(req.query.search) {
            filter.$or = [
                { name: { $regex: req.query.search, $options: "i" } },
                { brand: { $regex: req.query.search, $options: "i" } },
                { model: {$regex: req.query.search, $options: "i" } },
            ];
        }

        if(req.query.brand) {
            filter.brand = req.query.brand;
        }

        if(req.query.category) {
            filter.category = req.query.category;
        }

        if(req.query.sort) {
            const order = req.query.order === "desc" ? -1 : 1;
            sortOption[req.query.sort] = order;
        }

        const bikes = await Bike.find(filter).sort(sortOption);

        res.status(200).json({
            success: true,
            count: bikes.length,
            data: bikes,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// READ : Get single E-Bike by ID
const getBikeById = async (req, res) => {
    try {
        const bike = await Bike.findById(req.params.id);

        if(!bike) {
            return res.status(404).json({
                success: false,
                message: "E-Bike not found",
            });
        }

        res.status(200).json({
            success: true,
            data: bike,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// UPDATE: Update E-Bike details
const updateBike = async (req, res) => {
    try {
        const bike = await Bike.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!bike) {
            return res.status(404).json({
                success: false,
                message: "E-Bike not found",
            });
        }
        
        res.status(200).json({
            success: true,
            message: "E-Bike updated successfully",
            data: bike,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// UPDATE: Update E-Bike details by bikeId
const updateBikeByBikeId = async (req, res) => {
    try {
        const bike = await Bike.findOneAndUpdate(
            { bikeId: req.params.bikeId },
            req.body,
            { new: true, runValidators: true }
        );

        if (!bike) {
            return res.status(404).json({
                success: false,
                message: "E-Bike not found with this bikeId",
            });
        }

        res.status(200).json({
            success: true,
            message: "E-Bike updated successfully",
            data: bike,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// DELETE: Remove E-Bike
const deleteBike = async (req, res) => {
    try {
        const bike = await Bike.findByIdAndDelete(req.params.id);

        if (!bike) {
            return res.status(404).json({
                success: false,
                message: "E-Bike not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "E-Bike deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// DELETE: Remove E-Bike by bikeId
const deleteBikeByBikeId = async (req, res) => {
    try {
        const bike = await Bike.findOneAndDelete({ 
            bikeId: req.params.bikeId,
        });

        if(!bike) {
            return res.status(404).json({
                success: false,
                message: "E-Bike not found with this bikeId",
            });
        }

        res.status(200).json({
            success: true,
            message: "E-Bike deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};  

// SELL: Reduce stock after sale
const sellBike = async (req, res) => {
    try {
        const { quantity } = req.body;
        const { bikeId } = req.params;

        const bike = await Bike.findOne({ bikeId });

        if (!bike) {
            return res.status(404).json({
                success: false,
                message: "E-Bike not found",
            });
        }

        if (bike.stock < quantity) {
            return res.status(400).json({
                success: false,
                message: "Not enough stock available",
            });
        }

        bike.stock -= quantity;
        await bike.save();

        await StockHistory.create({
            bikeId: bike.bikeId,
            quantity: quantity,
            type: "SELL",
        });

        res.status(200).json({
            success: true,
            message: "E-Bike sold successfully",
            data: bike,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// GET: Low stock bikes
const getLowStockBikes = async (req, res) => {
    try {
        const bikes = await Bike.find({
            $expr: { $lte: ["$stock", "$minimumStock"] }
        });

        res.status(200).json({
            success: true,
            count: bikes.length,
            data: bikes,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// GET: Inventory statistics (dashboard)
const getInventoryStats = async (req, res) => {
    try {
        const totalModels = await Bike.countDocuments();

        const totalStockResult = await Bike.aggregate([
            {
                $group: {
                    _id: null,
                    totalStock: { $sum: "$stock" },
                },
            },
        ]);

        const totalStock =
            totalStockResult.length > 0 ? totalStockResult[0].totalStock : 0;

        const lowStockCount = await Bike.countDocuments({
            $expr: { $lte: ["$stock", "$minimumStock"] },
        });

        const outOfStockCount = await Bike.countDocuments({
            stock: 0,
        });

        res.status(200).json({
            success: true,
            data: {
                totalModels,
                totalStock,
                lowStockCount,
                outOfStockCount,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


//GET: Stock history (sales records)
const getStockHistory = async (req, res) => {
    try {
        const history = await StockHistory.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count:history.length,
            data: history,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const stockInBike = async (req, res) => {
    try {
        const { quantity, reason, referenceId } = req.body;
        const { bikeId } = req.params;

        const bike = await Bike.findOne({ bikeId });

        if(!bike) {
            return res.status(404).json({
                success: false,
                message: "Bike not found",
            });
        }

        bike.stock += quantity;
        await bike.save();

        await StockHistory.create({
            bikeId,
            quantity,
            type: "IN",
            reason,
            referenceId,
        });

        return res.json({
            success: true,
            message:"Stock IN recorded successfully",
            currentStock: bike.stock,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const stockOutBike = async (req, res) => {
    try{
        const { bikeId } = req.params;
        const { quantity, reason, referenceId } = req.body;

        const bike = await Bike.findOne({ bikeId });
        if(!bike) {
            return res.status(404).json({
                success: false,
                message: "Bike not found",
            });
        }

        if (bike.stock < quantity) {
            return res.status(400).json({
                success: false,
                message: "Not enough stock",
            });
        }

        bike.stock -= quantity;
        await bike.save();

        await StockHistory.create({
            bikeId,
            quantity,
            type: "OUT",
            reason,
            referenceId,
        });

        res.json({
            success: true,
            message: "Stock OUT recorded successfully",
            remainingStock: bike.stock,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// GET stock history by bikeId
const getStockHistoryByBikeId = async (req, res) => {
    try {
        const { productId } = req.params;

        const history = await StockHistory.find({ bikeId: productId })
            .sort({ createdAt: -1 });

        res.status(200).json({
                success: true,
                count: history.length,
                data: history,
        });   
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createBike,
    getAllBikes,
    getBikeById,
    updateBike,
    deleteBike,
    updateBikeByBikeId,
    deleteBikeByBikeId,
    getLowStockBikes,
    sellBike,
    getInventoryStats,
    getStockHistory,
    stockInBike,
    stockOutBike,
    getStockHistoryByBikeId,
};





