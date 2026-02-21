# Cloud-Based Inventory Management System (E-Bike)

The Cloud-Based Inventory Management System (E-Bike) is a full-stack MERN application developed to manage and monitor e-bike inventory efficiently using cloud-based database storage. This system allows businesses to maintain product records, track stock levels, calculate profit margins, and analyze overall inventory performance in real time.

The project is built using MongoDB, Express.js, React.js, and Node.js, ensuring scalability, security, and modern web application performance.

---

## Project Overview

This system provides a centralized platform for managing e-bike inventory. It supports role-based authentication with Admin and User access levels.

The Admin can:
- Add new e-bike models
- Upload product images
- Update product details
- Delete products
- Monitor stock levels
- View dashboard analytics
- Track revenue and profit
- Identify low stock products

The User can:
- Register and login
- Browse available e-bikes
- View product details
- Access product information securely

The application uses JWT-based authentication to secure user sessions and MongoDB Atlas for cloud-based database storage.

---

## System Architecture

The project follows a three-tier architecture:

Frontend (React.js)  
Backend (Node.js + Express.js)  
Database (MongoDB Atlas)

Data Flow:
User → React Frontend → Express Backend → MongoDB Database → Response → Frontend

---

## Tech Stack

Frontend:
- React.js
- React Router DOM
- Axios
- Context API
- CSS

Backend:
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer (Image Upload)
- CORS
- dotenv

Database:
- MongoDB Atlas (Cloud Database)

Development Tools:
- VS Code
- Postman
- GitHub

---

## Authentication & Security

- Password hashing for secure storage
- JWT token generation for session management
- Protected API routes
- Role-based access control (Admin/User)
- Input validation
- Secure image upload handling

---

## Dashboard Analytics

The Admin Dashboard provides:
- Total number of products
- Total stock quantity
- Total revenue
- Low stock alerts

All statistics are dynamically updated from the database.

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

- API testing using Postman
- JWT token validation
- CRUD operation testing
- Manual UI testing
- Console debugging
- Database connectivity testing

---

## Future Scope

- AI-based sales prediction
- Multi-store inventory management
- Barcode scanner integration
- Mobile application version
- Advanced analytics graphs
- Export reports (PDF/Excel)
- Email notifications for low stock

---

## Developed By

Dhanashree Kamble
Shraddha Jadhav
Mayuri Bharate

B.E. Computer Engineering
  
Cloud-Based Inventory Management System (E-Bike)