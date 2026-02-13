# 🌏 TourismBD Server API

> Backend Server for **TourismBD – Explore Bangladesh Smartly**
> Built with Node.js, Express 5 & MongoDB Atlas

---

## 🚀 Live Project

🖥 Backend :

* [https://tourism-bd-server.vercel.app](https://tourism-bd-server.vercel.app)

---

## 📌 Project Overview

**TourismBD Server** is a RESTful API built to power a modern tourism web application focused on Bangladesh travel destinations, blogs, reviews, and AI-based travel plans.

This backend handles:

* 📝 Blog Management
* 👤 User Management
* ⭐ Reviews
* 📍 Destinations
* 🧾 Travel Plans (Invoice-style saved plans)
* 🔐 Role Management (Admin/User)

---

## 🛠 Tech Stack

| Technology    | Version |
| ------------- | ------- |
| Node.js       | Latest  |
| Express       | ^5.1.0  |
| MongoDB       | ^6.16.0 |
| CORS          | ^2.8.5  |
| dotenv        | ^16.5.0 |
| cookie-parser | ^1.4.7  |

---

## 📂 Project Structure

```
tourism-bd-server/
│
├── index.js
├── package.json
├── .env
└── README.md
```

---

## 🔑 Environment Variables

Create a `.env` file in the root:

```
DB_USER=your_mongodb_username
DB_PASS=your_mongodb_password
PORT=5000
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/kamrul2006/tourism-bd-server.git
cd tourism-bd-server
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Start the server

```bash
npm start
```

Server runs on:

```
http://localhost:5000
```

---

Supports:

* GET
* POST
* PUT
* PATCH
* DELETE
* OPTIONS

---

# 📡 API Endpoints

---

## 📝 Blogs

| Method | Endpoint             | Description    |
| ------ | -------------------- | -------------- |
| GET    | `/Blogs`             | Get all blogs  |
| GET    | `/Blogs/:id`         | Get blog by ID |
| POST   | `/Blogs`             | Add new blog   |
| DELETE | `/Blogs/:id`         | Delete blog    |
| PATCH  | `/Blogs/approve/:id` | Approve blog   |

---

## 👤 Users

| Method | Endpoint                  | Description       |
| ------ | ------------------------- | ----------------- |
| GET    | `/users`                  | Get all users     |
| GET    | `/users/:email`           | Get user by email |
| POST   | `/users`                  | Add new user      |
| PATCH  | `/Users/admin/:id`        | Make user admin   |
| PATCH  | `/Users/remove-admin/:id` | Remove admin role |

---

## 📍 Destinations

| Method | Endpoint        | Description          |
| ------ | --------------- | -------------------- |
| GET    | `/destinations` | Get all destinations |
| POST   | `/destinations` | Add destination      |

---

## ⭐ Reviews

| Method | Endpoint   | Description     |
| ------ | ---------- | --------------- |
| GET    | `/reviews` | Get all reviews |
| POST   | `/reviews` | Add review      |

---

## 🧾 Travel Plans (Invoice System)

| Method | Endpoint     | Description         |
| ------ | ------------ | ------------------- |
| GET    | `/plans`     | Get all saved plans |
| GET    | `/plans/:id` | Get plan by ID      |
| POST   | `/plans`     | Save travel plan    |

Each saved plan includes:

* Invoice Number
* Status
* User Email
* Destination
* Travel Dates
* Preferences
* Budget Range
* Created Date

---

# 🔐 Security & Best Practices

* Environment variables for DB credentials
* CORS protected origins
* MongoDB ObjectId validation
* Role-based user management
* Clean REST architecture

---

# 💾 Database Collections

```
Tourism-BD-Server
│
├── Blogs
├── UsersList
├── ReviewsList
├── DestinationsList
└── AllPlansList
```

---

# 🧠 Features

✔ Modern REST API structure
✔ MongoDB Atlas cloud integration
✔ Admin role system
✔ Travel Plan Invoice storage
✔ Secure CORS configuration
✔ Clean, scalable architecture

---

# 📈 Future Improvements

* 🔐 JWT Authentication middleware
* 📊 Analytics & statistics endpoints
* 🧾 PDF generation server-side
* 🧠 AI itinerary generation
* 📦 Pagination & filtering
* 🛡 Rate limiting & security middleware

---

# 👨‍💻 Author

**Kamrul Islam Apurba**
Frontend Web Developer
Bangladesh 🇧🇩

🌐 Portfolio Project: TourismBD
📧 Email: <kamrulislamapurba@gmail.com>
💼 Specialization: React, Tailwind, Firebase, Node.js, MongoDB

---

# 📜 License

ISC License

---

# ⭐ If you like this project

Give it a ⭐ on GitHub and support the development!
