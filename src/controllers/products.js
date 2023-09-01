const { validationResult } = require("express-validator");
const response = require("../lib/response");
const constant = require("../constants/constants");
const queries = require("../lib/queries/products");

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: items } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, totalPages, currentPage, items };
};

exports.addProduct = async (req, res) => {
  const errors = await validationResult(req);
  if (!errors.isEmpty()) {
    return response.sendResponse(
      constant.response_code.BAD_REQUEST,
      null,
      null,
      res,
      errors
    );
  }
  try {
    const token = JSON.parse(req.token);
    let adminId = 1001;
    const body = req.body;

    let obj = {};
    obj.createdBy = adminId;
    obj.updatedBy = adminId;

    // obj.uniq_id = add uuid here

    obj.product_url = body.product_url;
    obj.product_name = body.product_name;
    obj.product_category_tree = body.product_category_tree;
    obj.pid = body.pid;
    obj.retail_price = body.retail_price;
    obj.discounted_price = body.discounted_price;
    obj.image = body.image;
    obj.isDeleted = body.isDeleted;
    obj.is_FK_Advantage_product = body.is_FK_Advantage_product;
    obj.description = body.description;
    obj.product_rating = body.product_rating;
    obj.brand = body.brand;
    obj.product_specifications = body.product_specifications;

    let data = await queries.createProduct(obj);

    return response.sendResponse(
      constant.response_code.SUCCESS,
      "Product added successfully!",
      null,
      res
    );
  } catch (err) {
    console.log(err);
    return response.sendResponse(
      constant.response_code.INTERNAL_SERVER_ERROR,
      err.message || constant.STRING_CONSTANTS.SOME_ERROR_OCCURED,
      null,
      res
    );
  }
};

exports.updateProduct = async (req, res) => {
  const errors = await validationResult(req);
  if (!errors.isEmpty()) {
    return response.sendResponse(
      constant.response_code.BAD_REQUEST,
      null,
      null,
      res,
      errors
    );
  }
  try {
    const token = JSON.parse(req.token);
    const adminId = token.id;
    const body = req.body;
    const isDeleted = req.delete;
    let id = body.uniq_id;

    let obj = {};
    obj.updatedBy = adminId;

    if (isDeleted) {
      obj.isDeleted = 1;
    } else {
      body.product_url ? (obj.product_url = body.product_url) : null;
      body.product_name ? (obj.product_name = body.product_name) : null;
      body.product_category_tree
        ? (obj.product_category_tree = body.product_category_tree)
        : null;
      body.retail_price ? (obj.retail_price = body.retail_price) : null;
      body.discounted_price
        ? (obj.discounted_price = body.discounted_price)
        : null;
      body.image ? (obj.image = body.image) : null;
      body.isDeleted ? (obj.isDeleted = body.isDeleted) : null;
      body.is_FK_Advantage_product
        ? (obj.is_FK_Advantage_product = body.is_FK_Advantage_product)
        : null;
      body.description ? (obj.description = body.description) : null;
      body.product_rating ? (obj.product_rating = body.product_rating) : null;
      body.brand ? (obj.brand = body.brand) : null;
      body.product_specifications
        ? (obj.product_specifications = body.product_specifications)
        : null;
    }

    let data = await queries.updateProduct(obj, { where: { uniq_id: id } });

    return response.sendResponse(
      constant.response_code.SUCCESS,
      "Product has been updated!",
      null,
      res
    );
  } catch (err) {
    return response.sendResponse(
      constant.response_code.INTERNAL_SERVER_ERROR,
      err.message || constant.STRING_CONSTANTS.SOME_ERROR_OCCURED,
      null,
      res
    );
  }
};

exports.getSingleProduct = async (req, res) => {
  const errors = await validationResult(req);
  if (!errors.isEmpty()) {
    return response.sendResponse(
      constant.response_code.BAD_REQUEST,
      null,
      null,
      res,
      errors
    );
  }
  try {
    const params = req.params;
    let id = params.id;

    let data = await queries.getProductById(id);

    return response.sendResponse(
      constant.response_code.SUCCESS,
      "Success",
      data,
      res
    );
  } catch (err) {
    console.log(err);
    return response.sendResponse(
      constant.response_code.INTERNAL_SERVER_ERROR,
      err.message || constant.STRING_CONSTANTS.SOME_ERROR_OCCURED,
      null,
      res
    );
  }
};

exports.getAllProducts = async (req, res) => {
  const errors = await validationResult(req);
  if (!errors.isEmpty()) {
    return response.sendResponse(
      constant.response_code.BAD_REQUEST,
      null,
      null,
      res,
      errors
    );
  }
  try {
    let query = req.query;
    let page = query.page ? query.page : 0;
    let size = query.size ? query.size : 8;

    const { limit, offset } = getPagination(page, size);

    let data = await queries.getAllProduct({
      where: { isDeleted: 0 },
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
      limit,
      offset,
    });

    data = getPagingData(data, page, limit);

    return response.sendResponse(
      constant.response_code.SUCCESS,
      "Success",
      data,
      res
    );
  } catch (err) {
    return response.sendResponse(
      constant.response_code.INTERNAL_SERVER_ERROR,
      err.message || constant.STRING_CONSTANTS.SOME_ERROR_OCCURED,
      null,
      res
    );
  }
};