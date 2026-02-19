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
    return res
      .status(409)
      .json({
        message:
          "User already exists! Please login or choose a different username.",
      });
  }

  users.push({ username, password });
  return res
    .status(200)
    .json({ message: "User successfully registered. Now you can login." });
});

// Task 2: Get the book list available in the shop (using async/await - Task 11)
public_users.get("/", async function (req, res) {
  try {
    // Simulate async data retrieval using Promise
    const getAllBooks = () => {
      return new Promise((resolve, reject) => {
        resolve(books);
      });
    };
    const allBooks = await getAllBooks();
    return res.status(200).json(allBooks);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error retrieving books", error: error.message });
  }
});

// Task 3: Get book details based on ISBN (using async/await - Task 11)
public_users.get("/isbn/:isbn", async function (req, res) {
  try {
    const isbn = req.params.isbn;
    const getBookByISBN = (isbn) => {
      return new Promise((resolve, reject) => {
        const book = books[isbn];
        if (book) {
          resolve(book);
        } else {
          reject(new Error(`Book with ISBN ${isbn} not found`));
        }
      });
    };
    const book = await getBookByISBN(isbn);
    return res.status(200).json(book);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
});

// Task 4: Get book details based on author (using async/await - Task 11)
public_users.get("/author/:author", async function (req, res) {
  try {
    const author = req.params.author;
    const getBooksByAuthor = (author) => {
      return new Promise((resolve, reject) => {
        const booksByAuthor = [];
        const bookKeys = Object.keys(books);
        bookKeys.forEach((key) => {
          if (books[key].author.toLowerCase() === author.toLowerCase()) {
            booksByAuthor.push({ isbn: key, ...books[key] });
          }
        });
        if (booksByAuthor.length > 0) {
          resolve(booksByAuthor);
        } else {
          reject(new Error(`No books found for author: ${author}`));
        }
      });
    };
    const result = await getBooksByAuthor(author);
    return res.status(200).json({ booksByAuthor: result });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
});

// Task 5: Get all books based on title (using async/await - Task 11)
public_users.get("/title/:title", async function (req, res) {
  try {
    const title = req.params.title;
    const getBooksByTitle = (title) => {
      return new Promise((resolve, reject) => {
        const booksByTitle = [];
        const bookKeys = Object.keys(books);
        bookKeys.forEach((key) => {
          if (books[key].title.toLowerCase().includes(title.toLowerCase())) {
            booksByTitle.push({ isbn: key, ...books[key] });
          }
        });
        if (booksByTitle.length > 0) {
          resolve(booksByTitle);
        } else {
          reject(new Error(`No books found with title: ${title}`));
        }
      });
    };
    const result = await getBooksByTitle(title);
    return res.status(200).json({ booksByTitle: result });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
});

// Task 6: Get book review based on ISBN
public_users.get("/review/:isbn", function (req, res) {
  const isbn = req.params.isbn;

  if (books[isbn]) {
    return res.status(200).json(books[isbn].reviews);
  } else {
    return res
      .status(404)
      .json({ message: `Book with ISBN ${isbn} not found` });
  }
});

module.exports.general = public_users;
