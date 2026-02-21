const express = require("express");
const router = express.Router();

<<<<<<< HEAD
const { createPurchase, getPurchases } = require("../controllers/purchaseController");
=======
const { createPurchase, getPurchases, deletePurchase } = require("../controllers/purchaseController");
>>>>>>> a3ff7a53c53dd7e0b7aa5b9f75ef0d59099b9b84
const { isAuth, isAdmin } = require("../middleware/authMiddleware");

// CREATE purchase
router.post("/", isAuth, isAdmin, createPurchase);

// GET all purchases
router.get("/", isAuth, isAdmin, getPurchases);

<<<<<<< HEAD
=======
// DELETE purchase by ID
router.delete("/:id", isAuth, isAdmin, deletePurchase);

>>>>>>> a3ff7a53c53dd7e0b7aa5b9f75ef0d59099b9b84
module.exports = router;
