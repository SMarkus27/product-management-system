import {Response} from "express";
import {ProductRepository} from "@root/src/infra/repository/products/repository";


export class DeleteProduct {
    constructor(readonly productRepository: ProductRepository) {
    }

    async execute(productId: string, response: Response): Promise<Response> {
        await this.productRepository.delete(productId);
        return response.status(200).json({
            success: true,
            message: "Product delete",
        })
    }
}