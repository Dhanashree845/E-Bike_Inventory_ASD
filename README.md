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

## Getting Started (Development)

### Prerequisites

- Node.js and npm installed
- MongoDB instance (local or MongoDB Atlas connection string)

### 1. Backend

```bash
cd Backend
npm install
```

Create a `.env` file inside `Backend` with at least:

```env
# Local MongoDB (for offline development)
MONGO_URI=mongodb://127.0.0.1:27017/ebike_inventory

# Or MongoDB Atlas connection string
# MONGO_URI=mongodb+srv://<user>:<password>@<cluster-url>/ebike_inventory

PORT=7000
JWT_SECRET=your_jwt_secret_here

# Email that will receive ADMIN role on first registration
ADMIN_EMAIL=admin_email_for_ADMIN_role@example.com
```

Then start the backend server:

```bash
npm run dev
```

The API will be available on `http://localhost:7000`.

### 2. Frontend

```bash
cd ebike-frontend
npm install
npm run dev
```

The React app will be available on `http://localhost:5173`.

> Note: If you see `EPERM: operation not permitted, symlink` during `npm install` on some filesystems, rerun `npm install` with `--no-bin-links`.

---

## Creating an Admin User (first login)

On a fresh database there are no users, so the first step is to create an account that has the `ADMIN` role.

1. Make sure the backend is running on port 7000.  
2. Set `ADMIN_EMAIL` in `Backend/.env` to the email you want to use for the admin.  
3. From a terminal or Postman, call the register endpoint:

	 ```bash
	 cd Backend
	 curl -X POST http://localhost:7000/api/auth/register \
		 -H "Content-Type: application/json" \
		 -d '{
			 "name": "Admin User",
			 "email": "admin_email_for_ADMIN_role@example.com",
			 "password": "Admin@123"
		 }'
	 ```

4. If registration succeeds, you can log in from the frontend login page using the same email and password.  
5. Any later registrations that do **not** use `ADMIN_EMAIL` will automatically get the `STAFF` role.

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

- This project does not currently include automated tests. The following manual checks are recommended when developing new features:
	- Use Postman or curl to test backend APIs.  
	- Verify JWT is issued on login and required for protected routes.  
	- Exercise full CRUD flows for bikes, customers, suppliers, purchases and sales.  
	- Check that stock levels and dashboard figures update as expected.  
	- Watch the backend terminal for errors while interacting with the UI.

For details on the original bugs that were found and fixed in this version, see the debugging log in `DEBUGGING_REPORT.md`.

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
