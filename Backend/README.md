<<<<<<< HEAD
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
=======
# Cloud-Based Inventory Management System (E-Bike) - Backend

### Group Members:
1. Dhanashree Kamble
2. Mayuri Bharate
3. Shraddha Jadhav


### Technologies Used:
    Node.js
    Express.js
    MongoDB Atlas
    Mongoose
    JWT Authentication
    Multer (for image upload)


### Features Implemented
    JWT-based Authentication 
    Role-based Access Control (ADMIN/ STAFF)
    Complete E-Bike Inventory CRUD Operations
    Customer Management and Supplier Management
    Purchase and Sales Tracking System
    Inventory and Transaction Report Generation
    Image Upload Support for E-Bikes
    Cloud Database Integration using MongoDB Atlas
    


### Description:
This project is a Cloud-Based E-Bike Inventory Management System backend developed using Node.js and Express.js. It provides secure REST APIs to perform CRUD operations on E-Bike inventory data with authentication and role-based access control.
>>>>>>> a3ff7a53c53dd7e0b7aa5b9f75ef0d59099b9b84
