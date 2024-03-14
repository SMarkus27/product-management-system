import {Request, Response} from "express";
import {ProductRepository} from "../infra/repository/product";
import {CreateProduct} from "../application/usecases/products/create_product";
import {UpdateProduct} from "../application/usecases/products/update_product";
import {DeleteProduct} from "../application/usecases/products/delete_product";
import {CategoryRepository} from "@root/src/infra/repository/category";

export class ProductController {

    static async create(request: Request, response: Response): Promise<Response> {
        const productRepository = new ProductRepository();
        const categoryRepository = new CategoryRepository();
        const createProduct = new CreateProduct(productRepository, categoryRepository);
        const productBody = request.body;
        return createProduct.execute(productBody, response)
    }
    static async updateProduct(request: Request, response: Response): Promise<Response> {
        const productRepository = new ProductRepository();
        const updateProduct = new UpdateProduct(productRepository);
        return updateProduct.execute(request, response)
    }

    static async deleteProduct(request: Request, response: Response): Promise<Response> {
        const productRepository = new ProductRepository();
        const deleteProduct = new DeleteProduct(productRepository);
        const productId = request.params.id;
        return deleteProduct.execute(productId, response)
    }

}