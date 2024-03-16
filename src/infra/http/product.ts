import express from "express"
import {ProductController} from "@controllers/product";

export const productRouter = express.Router();

productRouter.route("/product")
    .post(ProductController.create)

productRouter.route("/product/:id")
    .put(ProductController.updateProduct)
    .delete(ProductController.deleteProduct);


