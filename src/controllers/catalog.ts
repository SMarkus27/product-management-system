import {Request, Response} from "express";
import {ProductRepository} from "../infra/repository/product";
import {CategoryRepository} from "@root/src/infra/repository/category";
import {GetCatalog} from "@root/src/application/usecases/catalog/get_catalog";

export class CatalogController {

    static async getCatalog(request: Request, response: Response): Promise<Response> {
        const productRepository = new ProductRepository();
        const categoryRepository = new CategoryRepository();
        const getCatalog = new GetCatalog(productRepository, categoryRepository);
        return getCatalog.execute(response)
    }

}