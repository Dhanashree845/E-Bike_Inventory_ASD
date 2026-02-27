const express = require("express");
const router = express.Router();

const {
  createCustomer,
  getAllCustomers,
  updateCustomer,
  deleteCustomer,
} = require("../controllers/customerController");

const { isAuth, isAdmin } = require("../middleware/authMiddleware");

// CREATE customer
router.post("/", isAuth, createCustomer);

// GET all customers
router.get("/", isAuth, getAllCustomers);

// UPDATE customer by ID (admin)
router.put("/:id", isAuth, isAdmin, updateCustomer);

// DELETE customer by ID (admin)
router.delete("/:id", isAuth, isAdmin, deleteCustomer);

module.exports = router;
