var router = require("express").Router();
const products = require("../../controllers/products");
const { authorization } = require("../../middlewares");

router.post("/admin/product/add", authorization, products.addProduct);

router.post("/admin/product/:id/update", authorization, products.updateProduct);

router.post(
  "/admin/product/:id/delete",
  authorization,
  (req, res, next) => {
    req.delete = 1;
  },
  products.updateProduct
);

module.exports = router;
