const express = require("express");
const router = express.Router();

const {
  createCustomer,
  getAllCustomers,
} = require("../controllers/customerController");

const { isAuth } = require("../middleware/authMiddleware");

// CREATE customer
router.post("/", isAuth, createCustomer);

// GET all customers
router.get("/", isAuth, getAllCustomers);

module.exports = router;
