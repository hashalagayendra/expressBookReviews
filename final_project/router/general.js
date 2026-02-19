const express = require("express");
const axios = require("axios");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Task 7: Register a new user
public_users.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  if (isValid(username)) {
    return res.status(409).json({
      message:
        "User already exists! Please login or choose a different username.",
    });
  }

  users.push({ username, password });
  return res
    .status(200)
    .json({ message: "User successfully registered. Now you can login." });
});

// Task 2: Get all books — using Promise callback with Axios (Task 11)
public_users.get("/", function (req, res) {
  new Promise((resolve, reject) => {
    resolve(books);
  })
    .then((allBooks) => {
      res.send(JSON.stringify(allBooks, null, 4));
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Error retrieving books", error: err.message });
    });
});

// Task 3: Get book details based on ISBN — using async/await (Task 11)
public_users.get("/isbn/:isbn", async function (req, res) {
  const isbn = req.params.isbn;
  await new Promise((resolve, reject) => {
    const book = books[isbn];
    if (book) {
      resolve(book);
    } else {
      reject(new Error(`Book with ISBN ${isbn} not found`));
    }
  })
    .then((book) => {
      res.send(JSON.stringify(book, null, 4));
    })
    .catch((err) => {
      res.status(404).json({ message: err.message });
    });
});

// Task 4: Get book details based on author — using async/await (Task 11)
public_users.get("/author/:author", async function (req, res) {
  const author = req.params.author;
  await new Promise((resolve, reject) => {
    const booksByAuthor = [];
    Object.keys(books).forEach((key) => {
      if (books[key].author.toLowerCase() === author.toLowerCase()) {
        booksByAuthor.push({ isbn: key, ...books[key] });
      }
    });
    if (booksByAuthor.length > 0) {
      resolve(booksByAuthor);
    } else {
      reject(new Error(`No books found for author: ${author}`));
    }
  })
    .then((result) => {
      res.send(JSON.stringify({ booksByAuthor: result }, null, 4));
    })
    .catch((err) => {
      res.status(404).json({ message: err.message });
    });
});

// Task 5: Get all books based on title — using async/await (Task 11)
public_users.get("/title/:title", async function (req, res) {
  const title = req.params.title;
  await new Promise((resolve, reject) => {
    const booksByTitle = [];
    Object.keys(books).forEach((key) => {
      if (books[key].title.toLowerCase().includes(title.toLowerCase())) {
        booksByTitle.push({ isbn: key, ...books[key] });
      }
    });
    if (booksByTitle.length > 0) {
      resolve(booksByTitle);
    } else {
      reject(new Error(`No books found with title: ${title}`));
    }
  })
    .then((result) => {
      res.send(JSON.stringify({ booksByTitle: result }, null, 4));
    })
    .catch((err) => {
      res.status(404).json({ message: err.message });
    });
});

// Task 6: Get book review
public_users.get("/review/:isbn", function (req, res) {
  const isbn = req.params.isbn;
  if (books[isbn]) {
    return res.send(JSON.stringify(books[isbn].reviews, null, 4));
  } else {
    return res
      .status(404)
      .json({ message: `Book with ISBN ${isbn} not found` });
  }
});

module.exports.general = public_users;
