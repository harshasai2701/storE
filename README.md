# storE - MERN Stack E-commerce Platform

A full-featured, multi-vendor e-commerce application built with the MERN stack (MongoDB, Express, React, Node.js). This platform features a modern responsive UI, secure authentication, and a robust administrative dashboard for managing products, orders, and users.

## 🚀 Features

### Customer Features
- **User Authentication:** Secure registration and login using JWT and bcrypt password hashing.
- **Product Discovery:** Browse products with a clean, responsive layout.
- **Product Details:** Detailed view of products including price, description, and stock status.
- **Shopping Cart:** Add/remove items and adjust quantities with persistent state (LocalStorage).
- **Checkout Flow:** Seamless process for adding shipping details and placing orders.
- **Payment Method:** Supports "Cash On Delivery" (COD) for Phase 1.
- **User Profile:** View personal details and order history.

### Administrative Features
- **Product Management:** Full CRUD (Create, Read, Update, Delete) functionality for products.
- **Image Upload:** Local file upload for product images using Multer.
- **Order Management:** View all customer orders and track delivery status.
- **User Management:** View all registered users and manage administrative privileges.
- **Secure Access:** Protected routes and middleware ensuring only admins can access sensitive dashboard features.

## 🛠️ Tech Stack

- **Frontend:** React (Vite), Redux Toolkit (State Management), Tailwind CSS, Lucide React (Icons).
- **Backend:** Node.js, Express.
- **Database:** MongoDB (Mongoose ODM).
- **Authentication:** JSON Web Tokens (JWT).
- **File Upload:** Multer.

## 📦 Installation & Setup

### Prerequisites
- Node.js installed
- MongoDB (Local instance or MongoDB Atlas cluster)

### 1. Clone the repository
```bash
git clone https://github.com/harshasai2701/storE.git
cd storE
```

### 2. Backend Setup
```bash
cd server
npm install
```
Create a `.env` file in the `server` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 3. Frontend Setup
```bash
cd ../client
npm install
```

### 4. Running the Application
**Run Backend:**
```bash
cd server
node server.js
```
**Run Frontend:**
```bash
cd client
npm run dev
```

## 📂 Project Structure

```text
MernShop/
├── client/             # React Frontend (Vite)
│   ├── src/
│   │   ├── actions/    # Redux Actions
│   │   ├── components/ # Reusable UI Components
│   │   ├── constants/  # Action Type Constants
│   │   ├── pages/      # Full Page Components
│   │   ├── reducers/   # Redux Reducers
│   │   └── store.js    # Redux Store Config
├── server/             # Node.js/Express Backend
│   ├── config/         # DB Connection
│   ├── controllers/    # Route Logic
│   ├── middleware/     # Auth & Error Middleware
│   ├── models/         # Mongoose Schemas
│   ├── routes/         # API Endpoints
│   └── utils/          # Token Generation & Helpers
└── .gitignore          # Root ignore file
```

## 📜 Scripts
- **Seed Data:** Run `node seeder.js` in the `server` folder to populate the database with sample products and users.
- **Create Admin:** Run `node createAdmin.js` to create a default admin user.

---
