const express = require("express");
const router = express.Router();

const {
    createSupplier,
    getAllSuppliers,
    updateSupplier,
    deleteSupplier,
} = require("../controllers/supplierController");

// CREATE supplier
router.post("/", createSupplier);

// GET all suppliers
router.get("/", getAllSuppliers);

// UPDATE supplier by ID
router.put("/:id", updateSupplier);

// DELETE supplier by ID
router.delete("/:id", deleteSupplier);

module.exports = router;