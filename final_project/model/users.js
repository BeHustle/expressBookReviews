const jsonUsers = require("../data/users.json");
const fs = require("fs");
const util = require("util");

writeFile = util.promisify(fs.writeFile);
const usersDB = JSON.parse(JSON.stringify(jsonUsers));

const updateDB = () => {
  writeFile("./data/users.json", JSON.stringify(usersDB));
};

const getUserByName = (name) => {
  return usersDB.find((user) => user.name.toLowerCase() === name?.toLowerCase());
};

const createUser = async (user) => {
  usersDB.push(user);
  await updateDB();
};

module.exports = {
  getUserByName,
  createUser,
}