var router = require("express").Router();
const products = require("../../controllers/products");
const { authorization } = require("../../middlewares");

router.get("/user/product/:id", products.getSingleProduct);

router.get("/user/products/all", products.getAllProducts);

// router.post("/user/signup", )

module.exports = router;
