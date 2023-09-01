const db = require("../../models");
const constants = require("../../constants/constants");

createUser = async function (body) {
  return await db[constants.DB.table.USERSMASTER].create(body);
};

updateUser = async function (obj, query) {
  await db[constants.DB.table.USERSMASTER].update(obj, {
    where: query,
  });
};

getAllUsersWithoutPagination = async function (query) {
  return await db[constants.DB.table.USERSMASTER].findAll(query);
};

getAllUsers = async function (query) {
  return await db[constants.DB.table.USERSMASTER].findAndCountAll(query);
};

getUserById = async function (id) {
  return await db[constants.DB.table.USERSMASTER].findOne({
    where: { UserId: id },
  });
};

module.exports = {
  createUser,
  updateUser,
  getAllUserWithoutPagination,
  getAllUser,
  getUserById,
};
