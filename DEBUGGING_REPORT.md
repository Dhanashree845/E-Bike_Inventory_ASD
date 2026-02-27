# E-Bike Inventory – Backend Debugging Log

This is a log of what I found and fixed while getting the backend (and some tooling around it) into a stable, working state.

---

## Issue 1 – Using the wrong bcrypt library

**What I saw**  
The auth controller was importing `bcrypt`, but the dependency setup in `package.json`/`package-lock.json` didn’t cleanly match, and `bcrypt` itself is a native module that often causes install/runtime issues on different Node versions.

**Root cause**  
`bcrypt` requires native compilation and strict Node version support. For this student project that only needs basic hashing, using the pure-JS `bcryptjs` is simpler and more portable.

**Fix**  
- Switched the dependency from `bcrypt` to `bcryptjs` in the backend `package.json` and `package-lock.json`.  
- Updated the auth controller to:

	```js
	const bcrypt = require("bcryptjs");
	```

**Result**  
Password hashing and comparison now work reliably without native build errors, and the code imports exactly what is installed.

---

## Issue 2 – Git merge conflicts left inside source files

**What I saw**  
Several backend files contained raw Git conflict markers (`<<<<<<< HEAD`, `=======`, `>>>>>>>`). If Node tried to load any of these files, it would throw syntax errors and the server would never fully start.

**Files that had conflicts originally:**
- `Backend/controllers/customerController.js`  
- `Backend/controllers/purchaseController.js`  
- `Backend/controllers/reportController.js`  
- `Backend/controllers/saleController.js`  
- `Backend/controllers/supplierController.js`  
- `Backend/routes/customerRoutes.js`  
- `Backend/routes/purchaseRoutes.js`

**Root cause**  
A Git merge was done, but the conflicts weren’t resolved properly; both versions plus the conflict markers were committed.

**Fix**  
- Removed all conflict markers and carefully merged the intended logic on each file.  
- Ensured every controller exports valid async functions and every route file wires them correctly.

**Result**  
The backend now loads these modules without syntax errors, and the APIs behave consistently instead of crashing on import.

---

## Issue 3 – Customer API validation and admin protection

**What I saw**  
The customer-related code was inconsistent. Because of the earlier conflicts, some branches didn’t properly enforce unique emails, and the routes for updating/deleting customers were not clearly admin-only.

**Root cause**  
- Logic in `customerController` was split across different conflict branches.  
- `customerRoutes` had different versions of the middleware wiring; some paths didn’t use `isAdmin` for dangerous operations.

**Fix**  
- In `Backend/controllers/customerController.js`:
	- `createCustomer` now checks if an email already exists before saving a new customer.  
	- `updateCustomer` first verifies that the customer ID exists and then prevents changing the email to an address that is already in use by someone else.  
	- `getAllCustomers` and `deleteCustomer` were kept as clean, single implementations.
- In `Backend/routes/customerRoutes.js`:
	- Import `isAuth` and `isAdmin` once from `middleware/authMiddleware`.  
	- Require `isAdmin` for `PUT /:id` and `DELETE /:id` so only admins can update or delete customers.

**Result**  
Customer endpoints now correctly enforce email uniqueness and role-based access control, which is the behaviour you’d expect in a real system.

---

## Issue 4 – Purchase flow and stock history not fully wired

**What I saw**  
The purchase controller had duplicated/partial logic with conflict markers, and the routes didn’t consistently expose the delete endpoint. This made the file invalid JS and left the purchase lifecycle incomplete.

**Root cause**  
Unresolved merge plus incomplete wiring of the delete route.

**Fix**  
- In `Backend/controllers/purchaseController.js`:
	- Cleaned out the conflict markers and kept a single, clear `createPurchase` implementation that:
		- Validates required fields: `supplierName`, `bikeId`, `quantity`, `price`.  
		- Verifies that the referenced bike exists.  
		- Creates a `Purchase` record, updates the bike’s `stock`, and writes a `StockHistory` entry with type `"IN"` and the purchase as `referenceId`.
	- Kept `getPurchases` and `deletePurchase` as valid handlers, returning 404 when an ID does not exist.
- In `Backend/routes/purchaseRoutes.js`:
	- Exposed all three routes, all guarded by `isAuth` and `isAdmin`:
		- `POST /` → `createPurchase`  
		- `GET /` → `getPurchases`  
		- `DELETE /:id` → `deletePurchase`

**Result**  
The purchase flow now behaves like a proper inventory system: creating a purchase adjusts stock and history, and admins can view and remove purchase records.

---

## Issue 5 – Supplier update crashing due to a small typo

**What I saw**  
If you tried to update a supplier with a non-existing ID, the API responded with a 500 instead of a clean 404 JSON error.

**Root cause**  
In `Backend/controllers/supplierController.js`, the code accidentally called `res.status(404).jsosn(...)` (typo in `json`). That throws a runtime error instead of sending a response.

**Fix**  
Corrected the typo so the code now calls:

```js
res.status(404).json({
	success: false,
	message: "Supplier not found",
});
```

**Result**  
The endpoint now returns a proper 404 JSON payload for invalid IDs without crashing the server.

---

## Issue 6 – `npm run dev` scripts flaky on some systems

**What I saw**  
On some setups, running `npm run dev` in either the backend or frontend failed with errors complaining about `nodemon` or `vite` binaries, especially on filesystems that don’t like symlinks.

**Root cause**  
The default scripts relied on the shell automatically finding the executables from `node_modules/.bin`. If that path isn’t wired correctly or symlinks fail, the scripts break.

**Fix**  
- Backend (`Backend/package.json`):
	- Changed from:

		```json
		"dev": "nodemon server.js"
		```

		to:

		```json
		"dev": "node node_modules/nodemon/bin/nodemon.js server.js"
		```

- Frontend (`ebike-frontend/package.json`):
	- Changed from:

		```json
		"dev": "vite"
		```

		to:

		```json
		"dev": "node node_modules/vite/bin/vite.js"
		```

**Result**  
Both backend and frontend dev servers now start more reliably because they invoke the local binaries directly, which is friendlier to different environments.

---

Overall, with these fixes in place (and the correct `.env` and MongoDB Atlas configuration), the backend boots cleanly, the main APIs behave sensibly, and the project is in a much better state than the original handout version.
