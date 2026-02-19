# coding-project-template# 📚 Express Book Reviews API

A RESTful back-end application for an online bookstore, built with **Node.js**, **Express.js**, and **JWT authentication**. This is the final project for the IBM Back-End Development with Node & Express course.

---

## 🚀 Features

- 📖 Retrieve all available books
- 🔍 Search books by **ISBN**, **Author**, or **Title**
- 💬 View, add, update, and delete book reviews
- 🔐 User registration and JWT-based login
- ⚡ Async/await with Promises for all data retrieval operations

---

## 🛠️ Tech Stack

| Technology           | Purpose             |
| -------------------- | ------------------- |
| Node.js              | Runtime environment |
| Express.js           | Web framework       |
| JSON Web Token (JWT) | Authentication      |
| express-session      | Session management  |
| Axios                | Async HTTP requests |

---

## 📁 Project Structure

```
final_project/
├── index.js              # App entry point + JWT middleware
└── router/
    ├── booksdb.js        # Book data (JSON)
    ├── general.js        # Public routes (no auth required)
    └── auth_users.js     # Protected routes (auth required)
```

---

## 📡 API Endpoints

### Public Routes (No Login Required)

| Method | Endpoint          | Description            |
| ------ | ----------------- | ---------------------- |
| `POST` | `/register`       | Register a new user    |
| `GET`  | `/`               | Get all books          |
| `GET`  | `/isbn/:isbn`     | Get book by ISBN       |
| `GET`  | `/author/:author` | Get books by author    |
| `GET`  | `/title/:title`   | Get books by title     |
| `GET`  | `/review/:isbn`   | Get reviews for a book |

### Protected Routes (Login Required)

| Method   | Endpoint                      | Description              |
| -------- | ----------------------------- | ------------------------ |
| `POST`   | `/customer/login`             | Login as registered user |
| `PUT`    | `/customer/auth/review/:isbn` | Add or update a review   |
| `DELETE` | `/customer/auth/review/:isbn` | Delete your review       |

---

## ⚙️ Getting Started

### Prerequisites

- Node.js installed

### Installation

```bash
# Install dependencies
npm install

# Start the server
node index.js
```

Server runs on **http://localhost:5000**

---

## 🧪 Example cURL Commands

```bash
# Get all books
curl http://localhost:5000/

# Register a user
curl -X POST http://localhost:5000/register \
  -H "Content-Type: application/json" \
  -d "{\"username\":\"john\",\"password\":\"pass123\"}"

# Login
curl -X POST http://localhost:5000/customer/login \
  -H "Content-Type: application/json" \
  -d "{\"username\":\"john\",\"password\":\"pass123\"}" \
  -c cookies.txt

# Add a review (after login)
curl -X PUT "http://localhost:5000/customer/auth/review/1?review=Great+book" \
  -b cookies.txt

# Delete a review
curl -X DELETE http://localhost:5000/customer/auth/review/1 \
  -b cookies.txt
```

---

## 📄 License

MIT
