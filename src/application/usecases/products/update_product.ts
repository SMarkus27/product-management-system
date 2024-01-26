import {Request, Response} from "express";
import {ProductRepository} from "@root/src/infra/repository/products/repository";
import {Products} from "@domain/entities/products";

export class UpdateProduct {
    constructor(readonly productRepository: ProductRepository) {}

    async execute(request: Request, response: Response): Promise<Response> {
        const product = request.body;
        const productId = request.params.id;
        product.product_id = productId;

        await Products.create(product);

        const updateResult = await this.productRepository.update(productId, product);
        if (updateResult.modifiedCount > 0) {
            return response.status(200).json({
                success: true,
                message: "Product updated",
            })
        }
        return response.status(200).json({
            success: true,
            message: "Nothing to updated",
        })

    }
}