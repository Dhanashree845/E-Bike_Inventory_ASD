const express = require("express");
const router = express.Router();

const {
    createCustomer,
    getAllCustomers,
} = require("../controllers/customerController");

// CREATE customer
router.post("/", createCustomer);

// GET all customers
router.get("/", getAllCustomers);

module.exports = router;