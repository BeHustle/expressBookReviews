const jsonBooks = require("../data/books.json");
const util = require("util");
const fs = require("fs");

const booksDB = JSON.parse(JSON.stringify(jsonBooks));

writeFile = util.promisify(fs.writeFile);

const updateDB = () => {
  writeFile("./data/books.json", JSON.stringify(booksDB));
};

const getAllBooks = () => {
  return booksDB;
};

const getBookByISBN = (isbn) => {
  return booksDB.find((book) => book.isbn === isbn);
};

const getBooksByAuthor = (author) => {
  return booksDB.filter((book) => book.author.toLowerCase() === author?.toLowerCase());
};

const getBooksByTitle = (title) => {
  return booksDB.filter((book) => book.title.toLowerCase() === title?.toLowerCase());
};

const updateBookReview = (isbn, review) => {
  const book = getBookByISBN(isbn);
  book.reviews = [...book.reviews.filter((r) => r.username !== review.username), review];
  updateDB();
};

const deleteBookReview = (isbn, username) => {
  const book = getBookByISBN(isbn);
  book.reviews = book.reviews.filter((r) => r.username !== username);
  updateDB();
};

module.exports = {
  getAllBooks,
  getBookByISBN,
  getBooksByAuthor,
  getBooksByTitle,
  updateBookReview,
  deleteBookReview,
};
