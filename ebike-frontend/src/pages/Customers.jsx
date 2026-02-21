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

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [editId, setEditId] = useState(null);

  const role = localStorage.getItem("role"); 

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    bikeModel: ""
  });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const res = await axios.get("/customers");
      setCustomers(res.data.data || []);
    } catch (error) {
      console.error("Fetch Customers Error:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.phone) {
      alert("Name, Email and Phone are required");
      return;
    }

    try {
      
      if (editId && role === "ADMIN") {
        await axios.put(`/customers/${editId}`, formData);
        setEditId(null);
      } else {
        await axios.post("/customers", formData);
      }

      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        bikeModel: ""
      });

      fetchCustomers();
    } catch (error) {
      console.error("Save Customer Error:", error);
      alert(error.response?.data?.message || "Error saving customer");
    }
  };

  const handleEdit = (customer) => {
    if (role !== "ADMIN") return; 

    setEditId(customer._id);
    setFormData({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      address: customer.address || "",
      bikeModel: customer.bikeModel || ""
    });
  };

  const handleDelete = async (id) => {
    if (role !== "ADMIN") return; 

    try {
      await axios.delete(`/customers/${id}`);
      fetchCustomers();
    } catch (error) {
      console.error("Delete Error:", error);
    }
  };

  return (
    <>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Customer Management
      </Typography>

      {/* FORM */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Box display="flex" flexWrap="wrap" gap={2}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <TextField
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <TextField
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />

          <TextField
            label="Bike Model"
            name="bikeModel"
            value={formData.bikeModel}
            onChange={handleChange}
          />

          <Button variant="contained" onClick={handleSubmit}>
            {editId && role === "ADMIN"
              ? "Update Customer"
              : "Add Customer"}
          </Button>
        </Box>
      </Paper>

      {/* TABLE */}
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Bike Model</TableCell>

              {/*  Show Action column only for ADMIN */}
              {role === "ADMIN" && <TableCell>Action</TableCell>}
            </TableRow>
          </TableHead>

          <TableBody>
            {customers.length > 0 ? (
              customers.map((customer) => (
                <TableRow key={customer._id}>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell>{customer.address || "-"}</TableCell>
                  <TableCell>{customer.bikeModel || "-"}</TableCell>

                  {/* Only ADMIN sees Edit/Delete */}
                  {role === "ADMIN" && (
                    <TableCell>
                      <Button
                        size="small"
                        onClick={() => handleEdit(customer)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="small"
                        color="error"
                        onClick={() => handleDelete(customer._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={role === "ADMIN" ? 6 : 5}
                  align="center"
                >
                  No Customers Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
    </>
  );
}

export default Customers;
