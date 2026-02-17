import { useEffect, useState } from "react";
import axios from "../api/axios";
import {
  Typography,
  Box,
  Button,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  MenuItem,
  Chip
} from "@mui/material";

function Purchases() {
  const [purchases, setPurchases] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [bikes, setBikes] = useState([]);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    supplierName: "",
    bikeId: "",
    quantity: "",
    price: ""
  });

  const totalAmount =
    Number(formData.quantity || 0) * Number(formData.price || 0);

  useEffect(() => {
    fetchPurchases();
    fetchSuppliers();
    fetchBikes();
  }, []);

  const fetchPurchases = async () => {
    const res = await axios.get("/purchases");
    setPurchases(res.data.data || []);
  };

  const fetchSuppliers = async () => {
    const res = await axios.get("/suppliers");
    setSuppliers(res.data.data || []);
  };

  const fetchBikes = async () => {
    const res = await axios.get("/bikes");
    setBikes(res.data.data || []);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBikeChange = (e) => {
    const selectedBike = bikes.find(
      (bike) => bike.bikeId === e.target.value
    );

    setFormData({
      ...formData,
      bikeId: e.target.value,
      price: selectedBike ? selectedBike.price : ""
    });
  };

  const handleSubmit = async () => {
    if (!formData.supplierName || !formData.bikeId || !formData.quantity) {
      alert("All fields required");
      return;
    }

    try {
      const payload = {
        ...formData,
        quantity: Number(formData.quantity),
        price: Number(formData.price),
        totalAmount
      };

      if (editId) {
        await axios.put(`/purchases/${editId}`, payload);
        setEditId(null);
      } else {
        await axios.post("/purchases", payload);
      }

      setFormData({
        supplierName: "",
        bikeId: "",
        quantity: "",
        price: ""
      });

      fetchPurchases();
      fetchBikes();

    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(`/purchases/${id}`);
    fetchPurchases();
  };

  return (
    <>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Purchase Management
      </Typography>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Box display="flex" flexWrap="wrap" gap={2}>

          <TextField
            select
            label="Supplier"
            name="supplierName"
            value={formData.supplierName}
            onChange={handleChange}
          >
            {suppliers.map((supplier) => (
              <MenuItem key={supplier._id} value={supplier.name}>
                {supplier.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Bike"
            name="bikeId"
            value={formData.bikeId}
            onChange={handleBikeChange}
          >
            {bikes.map((bike) => (
              <MenuItem key={bike._id} value={bike.bikeId}>
                {bike.bikeId} - {bike.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Quantity"
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
          />

          <TextField label="Price" value={formData.price} disabled />
          <TextField label="Total" value={totalAmount} disabled />

          <Button variant="contained" onClick={handleSubmit}>
            {editId ? "Update Purchase" : "Add Purchase"}
          </Button>
        </Box>
      </Paper>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Supplier</TableCell>
              <TableCell>Bike</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {purchases.map((purchase) => (
              <TableRow key={purchase._id}>
                <TableCell>{purchase.supplierName}</TableCell>
                <TableCell>{purchase.bikeId}</TableCell>
                <TableCell>{purchase.quantity}</TableCell>
                <TableCell>₹ {purchase.price}</TableCell>
                <TableCell>₹ {purchase.totalAmount}</TableCell>
                <TableCell>
                  {new Date(purchase.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Chip label="Stock Added" color="success" />
                </TableCell>
                <TableCell>
                  <Button size="small" color="error" onClick={() => handleDelete(purchase._id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </>
  );
}

export default Purchases;
