const express = require('express');
const booksModel = require("../model/books.js");
const usersModel = require("../model/users.js");
const { hash } = require('bcrypt');

const public_users = express.Router();

public_users.post("/register", async (req, res) => {
  if (req.body.password === undefined || req.body.name === undefined) {
    return res.status(400).json({message: "Invalid request"});
  }
  const existingUser = usersModel.getUserByName(req.body.name);
  if (existingUser !== undefined) {
    return res.status(400).json({message: "User already exists"});
  }
  const hashedPassword = await hash(req.body.password, 10);
  const user = {
    name: req.body.name,
    passwordHash: hashedPassword,
  };
  await usersModel.createUser(user);
  return res.status(200).json({message: "User created successfully"});
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
  return res.status(200).json(booksModel.getAllBooks());
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  const book = booksModel.getBookByISBN(parseInt(req.params.isbn));
  if (book === undefined) {
    return res.status(404).json({message: "Book not found"});
  }
  return res.status(200).json(book);
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
  return res.status(200).json(booksModel.getBooksByAuthor(req.params.author));
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
  return res.status(200).json(booksModel.getBooksByTitle(req.params.title));
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
  const book = booksModel.getBookByISBN(parseInt(req.params.isbn));
  if (book === undefined) {
    return res.status(404).json({message: "Book not found"});
  }
  return res.status(200).json(book.reviews);
});

module.exports.general = public_users;
