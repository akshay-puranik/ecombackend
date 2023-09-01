const options = {
  DB: {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "aksh1234",
    DB: "ecommerce",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
};
module.exports = options;
