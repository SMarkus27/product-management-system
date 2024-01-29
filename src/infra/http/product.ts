import express from "express"
import {ProductController} from "@controllers/product";

const router = express.Router();

router.route("/product")
    .post(ProductController.create)

router.route("/product/:id")
    .put(ProductController.updateProduct)
    .delete(ProductController.deleteProduct);


module.exports = router;
