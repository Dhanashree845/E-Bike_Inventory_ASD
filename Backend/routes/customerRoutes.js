const express = require("express");
const router = express.Router();

<<<<<<< HEAD
const { isAuth, isAdmin } = require("../middleware/authMiddleware");

=======
>>>>>>> a3ff7a53c53dd7e0b7aa5b9f75ef0d59099b9b84
const {
  createCustomer,
  getAllCustomers,
  updateCustomer,
<<<<<<< HEAD
  deleteCustomer
} = require("../controllers/customerController");

// CREATE CUSTOMER
router.post("/", isAuth,createCustomer);

// GET ALL CUSTOMERS
router.get("/", isAuth, getAllCustomers);

// UPDATE CUSTOMER
router.put("/:id", isAuth, isAdmin, updateCustomer);

// DELETE CUSTOMER

router.delete("/:id", isAuth, isAdmin, deleteCustomer);
=======
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

>>>>>>> a3ff7a53c53dd7e0b7aa5b9f75ef0d59099b9b84
module.exports = router;
