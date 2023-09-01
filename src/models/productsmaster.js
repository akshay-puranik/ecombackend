const constant = require("../constants/constants");
module.exports = (sequelize, DataType) => {
  const templates = sequelize.define(
    constant.DB.table.PRODUCTSMASTER,
    {
      uniq_id: {
        primaryKey: true,
        type: DataType.STRING,
        allowNull: false,
      },
      crawl_timestamp: {
        type: DataType.STRING,
      },
      product_url: {
        type: DataType.STRING,
      },
      product_name: {
        type: DataType.STRING,
      },
      product_category_tree: {
        type: DataType.JSON,
      },
      pid: {
        type: DataType.STRING,
      },
      retail_price: {
        type: DataType.INTEGER,
      },
      discounted_price: {
        type: DataType.INTEGER,
      },
      image: {
        type: DataType.JSON,
      },
      isDeleted: {
        type: DataType.INTEGER,
        defaultValue: 0,
      },
      is_FK_Advantage_product: {
        type: DataType.INTEGER,
        defaultValue: 0,
      },
      description: {
        type: DataType.TEXT,
      },
      product_rating: {
        type: DataType.STRING,
      },
      brand: {
        type: DataType.STRING,
      },
      product_specifications: {
        type: DataType.STRING,
      },
      createdBy: {
        type: DataType.BIGINT,
        allowNull: false,
      },
      updatedBy: {
        type: DataType.BIGINT,
        allowNull: false,
      },
      createdAt: {
        allowNull: true,
        type: DataType.BIGINT,
      },
      updatedAt: {
        allowNull: true,
        type: DataType.BIGINT,
      },
    },
    {
      hooks: {
        beforeCreate: (record, options) => {
          record.dataValues.createdAt = Math.floor(Date.now());
          record.dataValues.updatedAt = Math.floor(Date.now());
        },
        beforeUpdate: (record, options) => {
          record.dataValues.updatedAt = Math.floor(Date.now());
        },
        beforeBulkUpdate: (record, options) => {
          record.attributes.updatedAt = Math.floor(Date.now());
        },
        beforeBulkCreate: (record, options) => {
          record.dataValues.createdAt = Math.floor(Date.now());
          record.dataValues.updatedAt = Math.floor(Date.now());
        },
      },
    }
  );

  return templates;
};
