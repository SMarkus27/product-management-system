import express from "express"
import {CatalogController} from "@controllers/catalog";

const router = express.Router();

router.route("/catalog")
    .get(CatalogController.getCatalog)


module.exports = router;
