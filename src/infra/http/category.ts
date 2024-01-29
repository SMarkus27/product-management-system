import express from "express"
import {CategoryController} from "@controllers/category";

const router = express.Router();

router.route("/category")
    .post(CategoryController.create)

router.route("/category/:id")
    .put(CategoryController.updateCategory)
    .delete(CategoryController.deleteCategory);

module.exports = router;
