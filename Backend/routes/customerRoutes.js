const express = require("express");
const router = express.Router();

const {
  createCustomer,
  getAllCustomers,
  updateCustomer,
  deleteCustomer,
} = require("../controllers/customerController");

const { isAuth } = require("../middleware/authMiddleware");

// CREATE customer
router.post("/", isAuth, createCustomer);

// GET all customers
router.get("/", isAuth, getAllCustomers);

// UPDATE customer by ID
router.put("/:id", isAuth, updateCustomer);

// DELETE customer by ID
router.delete("/:id", isAuth, deleteCustomer);

module.exports = router;
