import express from "express"
import {CatalogController} from "@controllers/catalog";

export const catalogRouter = express.Router();

catalogRouter.route("/catalog")
    .get(CatalogController.getCatalog)


