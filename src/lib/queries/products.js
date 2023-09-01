const db = require("../../models");
const constants = require("../../constants/constants");

createProduct = async function (obj) {
  return await db[constants.DB.table.PRODUCTSMASTER].create(obj);
};

updateProduct = async function (obj, query) {
  await db[constants.DB.table.PRODUCTSMASTER].update(obj, {
    where: query,
  });
};

getAllProductWithoutPagination = async function (query) {
  return await db[constants.DB.table.PRODUCTSMASTER].findAll(query);
};

getAllProduct = async function (query) {
  return await db[constants.DB.table.PRODUCTSMASTER].findAndCountAll(query);
};

getProductById = async function (id) {
  return await db[constants.DB.table.PRODUCTSMASTER].findOne({
    where: { uniq_id: id },
    attributes: [
      "uniq_id",
      "product_url",
      "product_name",
      "retail_price",
      "discounted_price",
      "image",
      "is_FK_Advantage_product",
      "description",
      "product_rating",
      "brand",
      "product_specifications",
    ],
  });
};

module.exports = {
  createProduct,
  updateProduct,
  getAllProductWithoutPagination,
  getAllProduct,
  getProductById,
};
