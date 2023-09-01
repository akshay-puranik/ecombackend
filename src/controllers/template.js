const { validationResult } = require("express-validator");
const response = require("../lib/response");
const constant = require("../constants/constants");
const queryTemplate = require("../lib/queries/template");

const getPagination = (page, size) => {
	const limit = size ? +size : 3;
	const offset = page ? page * limit : 0;
	return { limit, offset };
};

const getPagingData = (data, page, limit) => {
	const { count: totalItems, rows: template } = data;
	const currentPage = page ? +page : 0;
	const totalPages = Math.ceil(totalItems / limit);
	return { totalItems, totalPages, currentPage, template };
};

// Create and save a new template
exports.create = async (req, res) => {
  try {
    let errors = await validationResult(req);
    if (!errors.isEmpty()) {
      return response.sendResponse(
        constant.response_code.BAD_REQUEST,
        null,
        null,
        res,
        errors
      );
    }
    const data = await queryTemplate.createTemplate(req.body);
    return response.sendResponse(
      constant.response_code.SUCCESS,
      "Success",
      data,
      res,
      errors
    );
  } catch (err) {
    return response.sendResponse(
      constant.response_code.INTERNAL_SERVER_ERROR,
      err.message || constant.STRING_CONSTANTS.SOME_ERROR_OCCURED,
      null,
      res,
      err
    );
  }
};

// // Retrieve all template from the database.
exports.findAll = async (req, res) => {
  try {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);
    let templateList = await queryTemplate.getAllTemplate({
      where: { isDeleted: 0 },
      limit,
      offset,
    });

    const result = getPagingData(templateList, page, limit);
    return response.sendResponse(
      constant.response_code.SUCCESS,
      "Success",
      result,
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

// // Retrieve all template from the database.
exports.findAllWithoutPagination = async (req, res) => {
  try {
    let templateList = await queryTemplate.getAllTemplate({
      where: { isDeleted: 0 },
    });
    return response.sendResponse(
      constant.response_code.SUCCESS,
      "Success",
      templateList,
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

// // Find a single template with an id
exports.findOne = async (req, res) => {
  const id = parseInt(req.body.id);
  try {
    let errors = await validationResult(req);
    if (!errors.isEmpty()) {
      return response.sendResponse(
        constant.response_code.BAD_REQUEST,
        null,
        null,
        res,
        errors
      );
    }
    const template = await queryTemplate.getTemplateById(id);
    if (template == null || !template) {
      return response.sendResponse(
        constant.response_code.NOT_FOUND,
        `Cannot find data with id=${id}. Maybe data was not found or req.body is empty!`,
        null,
        res
      );
    } else {
      return response.sendResponse(
        constant.response_code.SUCCESS,
        "Success",
        template,
        res
      );
    }
  } catch (err) {
    return response.sendResponse(
      constant.response_code.INTERNAL_SERVER_ERROR,
      "Error finding data with id=" + id,
      null,
      res,
      err
    );
  }
};

// // Update a template by the id in the request
exports.update = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    let errors = await validationResult(req);
    if (!errors.isEmpty()) {
      return response.sendResponse(
        constant.response_code.BAD_REQUEST,
        null,
        null,
        res,
        errors
      );
    }
    const template = await queryTemplate.getTemplateById(id);
    if (template == null || !template) {
      return response.sendResponse(
        constant.response_code.NOT_FOUND,
        `Cannot update data with id=${id}.`
      );
    } else {
      // update templateList
      let data = await queryTemplate.updateTemplate(req.body, { id: id });
      return response.sendResponse(
        constant.response_code.SUCCESS,
        "Data was updated successfully.",
        data,
        res
      );
    }
  } catch (err) {
    return response.sendResponse(
      constant.response_code.INTERNAL_SERVER_ERROR,
      "Error updating data with id=" + id,
      null,
      res,
      err
    );
  }
};

// // Activate a template by the id in the request
exports.activate = async (req, res) => {
  const id = parseInt(req.body.id);
  let updatedBy = parseInt(req.body.updatedBy);
  try {
    let errors = await validationResult(req);
    if (!errors.isEmpty()) {
      return response.sendResponse(
        constant.response_code.BAD_REQUEST,
        null,
        null,
        res,
        errors
      );
    }
    const templateList = await queryTemplate.getTemplateById(id);
    if (templateList == null || !templateList) {
      return response.sendResponse(
        constant.response_code.NOT_FOUND,
        `Cannot activate data with id=${id}. Maybe data was not found or req.body is empty!`,
        null,
        res
      );
    } else if (templateList.isDeleted == true) {
      // update templateList
      let obj = { isDeleted: 0 };
      let data = await queryTemplate.updateTemplate(obj, { id: id });
      return response.sendResponse(
        constant.response_code.SUCCESS,
        "Data was activated successfully.",
        data,
        res
      );
    } else {
      return response.sendResponse(
        constant.response_code.SUCCESS,
        "Data was already activated.",
        null,
        res
      );
    }
  } catch (err) {
    return response.sendResponse(
      constant.response_code.INTERNAL_SERVER_ERROR,
      "Error activating data with id=" + id,
      null,
      res,
      err
    );
  }
};
