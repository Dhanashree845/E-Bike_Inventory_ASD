# Cloud-Based Inventory Management System (E-Bike) – Frontend

This is the frontend application of the Cloud-Based Inventory Management System developed using React.js. It provides a responsive and interactive user interface for managing and viewing e-bike inventory data.

The frontend communicates with the backend REST APIs to perform authentication, CRUD operations, and dashboard analytics.

---

## Overview

The frontend handles:

- User Registration and Login
- JWT-based authentication handling
- Role-based UI rendering (Admin/User)
- Displaying E-Bike inventory
- Adding, editing, and deleting products (Admin)
- Image upload interface
- Dashboard statistics display
- Protected routes
- Error handling and notifications

The application ensures secure communication with the backend using JWT tokens stored in localStorage.

---

## Technologies Used

- React.js
- React Router DOM
- Axios
- Context API (State Management)
- CSS
- JWT Authentication Handling

---

## Authentication Handling

- Stores JWT token after login
- Sends Authorization header in API requests
- Redirects unauthorized users
- Admin-only UI components
- Logout clears token and session

---

## Features Implemented

Admin Features:
- Add new E-Bike
- Upload image
- Update product details
- Delete product
- View dashboard analytics
- Monitor stock levels

User Features:
- Register
- Login
- View product list
- View product details

Dashboard:
- Total products
- Total stock
- Total revenue
- Low stock count

---

## Testing

- Axios API testing
- Protected route verification
- Console debugging
- Manual UI validation

---

## Developed By

Dhanashree Kamble
Shraddha Jadhav
Mayuri Bharate

B.E. Computer Engineering