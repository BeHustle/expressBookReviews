const express = require('express');
const jwt = require('jsonwebtoken');
const usersModel = require("../model/users.js");
const booksModel = require("../model/books.js");
const {compare} = require('bcrypt');
const {JWT_AT_SECRET, JWT_AT_EXPIRES_IN} = require('../env');

const regd_users = express.Router();

//only registered users can login
regd_users.post("/login", async (req, res) => {
  const user = usersModel.getUserByName(req.body.name);
  if (user === undefined) {
    return res.status(400).json({message: "User does not exist"});
  }
  const isValid = await compare(req.body.password, user.passwordHash);
  if (!isValid) {
    return res.status(400).json({message: "Invalid credentials"});
  }

  const token = jwt.sign({name: user.name}, JWT_AT_SECRET, {expiresIn: JWT_AT_EXPIRES_IN});

  return res.status(200).json({accessToken: token});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const book = booksModel.getBookByISBN(parseInt(req.params.isbn));
  if (book === undefined) {
    return res.status(404).json({message: "Book not found"});
  }
  booksModel.updateBookReview(parseInt(req.params.isbn), {username: req.user.name, text: req.query.text});
  return res.status(200).json({message: "Review added successfully"});
});

// Removes a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
  const book = booksModel.getBookByISBN(parseInt(req.params.isbn));
  if (book === undefined) {
    return res.status(404).json({message: "Book not found"});
  }
  booksModel.deleteBookReview(parseInt(req.params.isbn), req.user.name);
  return res.status(200).json({message: "Review removed successfully"});
});

module.exports.authenticated = regd_users;
