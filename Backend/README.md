# Cloud-Based Inventory Management System (E-Bike) – Backend

This is the backend server of the Cloud-Based Inventory Management System built using Node.js and Express.js. It provides RESTful APIs for managing e-bike inventory, authentication, and dashboard analytics.

The backend connects to MongoDB Atlas for cloud-based data storage and implements JWT-based authentication for secure access.

---

## Overview

The backend handles:

- User Registration and Login
- Password hashing
- JWT token generation
- Role-based authorization
- CRUD operations on e-bike inventory
- Image upload handling
- Profit calculation logic
- Dashboard statistics API
- Database interaction using Mongoose

---

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Tokens)
- Multer (Image Upload)
- CORS
- dotenv

---

## Authentication & Security

- Password hashing before storing in database
- JWT token generation during login
- Middleware for protected routes
- Role-based access control
- Admin-only API protection
- Secure image upload handling

---

## Database Schema

User Schema:
- name
- email
- password
- role
- createdAt

E-Bike Schema:
- title
- model
- batteryCapacity
- range
- purchasePrice
- sellingPrice
- stock
- image
- createdAt

---

## Testing

- API testing with Postman
- JWT validation testing
- CRUD operation testing
- Database connectivity testing
- Error handling validation

---

## Developed By

Dhanashree Kamble
Shraddha Jadhav
Mayuri Bharate

B.E. Computer Engineering