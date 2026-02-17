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
  Paper
} from "@mui/material";

function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    productsSupplied: ""
  });

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const res = await axios.get("/suppliers");
      setSuppliers(res.data.data || res.data || []);
    } catch (error) {
      console.error("Fetch suppliers error:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        ...formData,
        productsSupplied: formData.productsSupplied
          ? formData.productsSupplied.split(",").map(p => p.trim())
          : []
      };

      if (editId) {
        await axios.put(`/suppliers/${editId}`, payload);
        setEditId(null);
      } else {
        await axios.post("/suppliers", payload);
      }

      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        productsSupplied: ""
      });

      fetchSuppliers();
    } catch (error) {
      console.error("Submit supplier error:", error);
    }
  };

  const handleEdit = (supplier) => {
    setEditId(supplier._id);
    setFormData({
      name: supplier.name || "",
      email: supplier.email || "",
      phone: supplier.phone || "",
      address: supplier.address || "",
      productsSupplied: supplier.productsSupplied
        ? supplier.productsSupplied.join(", ")
        : ""
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/suppliers/${id}`);
      fetchSuppliers();
    } catch (error) {
      console.error("Delete supplier error:", error);
    }
  };

  return (
    <>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Supplier Management
      </Typography>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Box display="flex" flexWrap="wrap" gap={2}>

          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />

          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          <TextField
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />

          <TextField
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />

          <TextField
            label="Products Supplied (comma separated)"
            name="productsSupplied"
            value={formData.productsSupplied}
            onChange={handleChange}
            fullWidth
          />

          <Button variant="contained" onClick={handleSubmit}>
            {editId ? "Update Supplier" : "Add Supplier"}
          </Button>

        </Box>
      </Paper>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Products</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {suppliers.map((supplier) => (
            <TableRow key={supplier._id}>
              <TableCell>{supplier.name}</TableCell>
              <TableCell>{supplier.email}</TableCell>
              <TableCell>{supplier.phone}</TableCell>
              <TableCell>{supplier.address}</TableCell>
              <TableCell>
                {supplier.productsSupplied?.join(", ")}
              </TableCell>
              <TableCell>
                <Button size="small" onClick={() => handleEdit(supplier)}>
                  Edit
                </Button>
                <Button
                  size="small"
                  color="error"
                  onClick={() => handleDelete(supplier._id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default Suppliers;
