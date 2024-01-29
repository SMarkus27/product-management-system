import {Response} from "express";
import {v4 as uuid4} from "uuid";

import {ProductRepository} from "@root/src/infra/repository/products/repository";
import {ProductType} from "@domain/entities/types/product";
import {Products} from "@domain/entities/products";

export class CreateProduct {
    constructor(readonly productRepository: ProductRepository) {
    }

    async execute(product: ProductType, response: Response): Promise<Response> {
        const productId = uuid4();
        product.product_id = productId;
        const productExist = await this.productRepository.getOne(productId);
        if (productExist) {
            return response.status(200).json({
                success: true,
                message: "Product already exist",
            })
        }

        const validProduct = await Products.create(product);
        await this.productRepository.create(validProduct);
        return response.status(200).json({
            success: true,
            message: "Product created",
        })
    }
}