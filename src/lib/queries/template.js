const db = require("../../models");
const constants = require("../../constants/constants");

createTemplate = async function (body) {
	return await db[constants.DB.table.TEMPLATE_MASTER].create(body);
};
updateTemplate = async function (obj, query) {
	await db[constants.DB.table.TEMPLATE_MASTER].update(obj, {
		where: query,
	});
};
getAllTemplateWithoutPagination = async function (query) {
	return await db[constants.DB.table.TEMPLATE_MASTER].findAll(query);
};
getAllTemplate = async function (query) {
	return await db[constants.DB.table.TEMPLATE_MASTER].findAndCountAll(query);
};

getTemplateById = async function (id) {
	return await db[constants.DB.table.TEMPLATE_MASTER].findOne({ where: { TemplateId: id } });
};

module.exports = {
	createTemplate,
	updateTemplate,
	getAllTemplateWithoutPagination,
	getAllTemplate,
	getTemplateById,
};
