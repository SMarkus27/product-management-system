import {Response} from "express";

import {ProductRepository} from "@root/src/infra/repository/product";
import {ProductType} from "@domain/entities/types/product";
import {Products} from "@domain/entities/products";
import {CategoryRepository} from "@root/src/infra/repository/category";

export class CreateProduct {
    constructor(readonly productRepository: ProductRepository,
                readonly categoryRepository: CategoryRepository) {
    }

    async execute(product: ProductType, response: Response): Promise<Response> {
        const validProduct = await Products.create(product);

        const category = validProduct.category.toLowerCase()
        const categoryResult = await this.categoryRepository.getOne(category);

        if (!categoryResult) {
            return response.status(404).json({
                success: true,
                message: "Category not found.",
            })
        }

        const productExist = await this.productRepository.getOne({title: validProduct.title});

        if (productExist) {
            return response.status(200).json({
                success: true,
                message: "Product already exist",
            })
        }

        await this.productRepository.create(validProduct);

        return response.status(200).json({
            success: true,
            message: "Product created",
        })
    }

}