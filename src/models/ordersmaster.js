const constant = require("../constants/constants");

module.exports = (sequelize, DataType) => {
  const templates = sequelize.define(
    constant.DB.table.USERSMASTER,
    {
      id: {
        primaryKey: true,
        type: DataType.BIGINT,
        allowNull: false,
        autoIncrement: true,
      },
      userId: {
        type: DataType.INTEGER,
        allowNull: false,
        // references: {
        //   model: ,
        //   key: 'id',
        // },
      },
      items: {
        type: DataType.JSON,
        allowNull: false,
      },
      deliveredOn: {
        type: DataType.BIGINT,
      },
      email: {
        type: DataType.STRING,
        allowNull: false,
      },
      isActive: {
        type: DataType.BOOLEAN,
        default: true,
      },
      profileImage: {
        type: DataType.STRING,
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
      },
    }
  );

  return templates;
};
