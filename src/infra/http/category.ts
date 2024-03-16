import express from "express"
import {CategoryController} from "@controllers/category";

export const categoryRouter = express.Router();

categoryRouter.route("/category")
    .post(CategoryController.create)

categoryRouter.route("/category/:id")
    .put(CategoryController.updateCategory)
    .delete(CategoryController.deleteCategory);

