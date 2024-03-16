import {Response} from "express";
import {ProductRepository} from "@root/src/infra/repository/product";


export class DeleteProduct {
    constructor(readonly productRepository: ProductRepository) {
    }

    async execute(productId: string, response: Response): Promise<Response> {

        const productResult = await this.productRepository.getOne({_id: productId})
        console.log(productResult)
        if (!productResult) {
            return response.status(404).json({
                success: true,
                message: "Product not found",
            })
        }

        await this.productRepository.delete(productId);
        return response.status(200).json({
            success: true,
            message: "Product delete",
        })
    }
}