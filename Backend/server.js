const authRoutes = require("./routes/authRoutes");
const path = require("path");
const connectDB = require("./config/db");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const bikeRoutes = require("./routes/bikeRoutes");

dotenv.config();

const app = express();

//Middleware
app.use(express.json());
app.use(cors());

app.use("/api/bikes", bikeRoutes);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));


const supplierRoutes = require("./routes/supplierRoutes");
const purchaseRoutes = require("./routes/purchaseRoutes");
const saleRoutes = require("./routes/saleRoutes");
const customerRoutes = require("./routes/customerRoutes");
const reportRoutes = require("./routes/reportRoutes");


app.use("/api/auth",authRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/purchases", purchaseRoutes);
app.use("/api/sales", saleRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/reports", reportRoutes);


connectDB();

//Test route
app.get("/", (req, res) => {
    res.send("E-Bike Inventory Backend is Running");
});

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});