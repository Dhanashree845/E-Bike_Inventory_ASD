import { useEffect, useState } from "react";
import axios from "../api/axios";
import {
  Typography,
  Box,
  Button,
  TextField,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@mui/material";

function Sales() {
  const [sales, setSales] = useState([]);

  const [customer, setCustomer] = useState("");
  const [bikeId, setBikeId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("PAID");
  const [paymentMethod, setPaymentMethod] = useState("CASH");

  const fetchSales = async () => {
    try {
      const res = await axios.get("/sales");
      setSales(res.data.data || res.data || []);
    } catch (err) {
      console.error("Fetch Sales Error:", err);
      setSales([]);
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

  const handleSubmit = async () => {
    if (!customer || !bikeId || !quantity || !sellingPrice) {
      alert("Please fill all required fields");
      return;
    }

    try {
      const totalAmount = Number(quantity) * Number(sellingPrice);

      await axios.post("/sales", {
        customer,
        bikeId,
        quantity: Number(quantity),
        sellingPrice: Number(sellingPrice),
        totalAmount,
        paymentStatus,
        paymentMethod
      });

      setCustomer("");
      setBikeId("");
      setQuantity("");
      setSellingPrice("");
      setPaymentStatus("PAID");
      setPaymentMethod("CASH");

      fetchSales();
    } catch (err) {
      console.error("Submit Sale Error:", err);
      alert("Failed to add sale");
    }
  };

  return (
    <>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Sales Management
      </Typography>

      <Box sx={{ mb: 3, display: "flex", flexWrap: "wrap", gap: 2 }}>
        <TextField label="Customer Name" value={customer} onChange={(e) => setCustomer(e.target.value)} />
        <TextField label="Bike ID" value={bikeId} onChange={(e) => setBikeId(e.target.value)} />
        <TextField label="Quantity" type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        <TextField label="Selling Price" type="number" value={sellingPrice} onChange={(e) => setSellingPrice(e.target.value)} />

        <TextField select label="Payment Status" value={paymentStatus} onChange={(e) => setPaymentStatus(e.target.value)}>
          <MenuItem value="PAID">PAID</MenuItem>
          <MenuItem value="PENDING">PENDING</MenuItem>
        </TextField>

        <TextField select label="Payment Method" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
          <MenuItem value="CASH">CASH</MenuItem>
          <MenuItem value="UPI">UPI</MenuItem>
          <MenuItem value="CARD">CARD</MenuItem>
        </TextField>

        <Button variant="contained" onClick={handleSubmit}>
          Add Sale
        </Button>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Customer</TableCell>
            <TableCell>Bike ID</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Selling Price</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Method</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sales.map((sale) => (
            <TableRow key={sale._id}>
              <TableCell>{sale.customer}</TableCell>
              <TableCell>{sale.bikeId}</TableCell>
              <TableCell>{sale.quantity}</TableCell>
              <TableCell>{sale.sellingPrice}</TableCell>
              <TableCell>{sale.totalAmount}</TableCell>
              <TableCell>{sale.paymentStatus}</TableCell>
              <TableCell>{sale.paymentMethod}</TableCell>
              <TableCell>
                {sale.saleDate
                  ? new Date(sale.saleDate).toLocaleDateString()
                  : "N/A"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default Sales;
