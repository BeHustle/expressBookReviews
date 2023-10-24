const axios = require('axios');
const {PORT, HOST} = require('./env.js');

const mkUrl = (path) => `http://${HOST}:${PORT}${path}`;

const getAllBooks = async () => {
  try {
    const response = await axios.get(mkUrl('/'));
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getBookByISBN = async (isbn) => {
  try {
    const response = await axios.get(mkUrl(`/isbn/${isbn}`));
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getBooksByAuthor = async (author) => {
  try {
    const response = await axios.get(mkUrl(`/author/${author}`));
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getBooksByTitle = async (title) => {
  try {
    const response = await axios.get(mkUrl(`/title/${title}`));
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllBooks,
  getBookByISBN,
  getBooksByAuthor,
  getBooksByTitle,
};
