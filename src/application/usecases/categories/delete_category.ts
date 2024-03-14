import {CategoryRepository} from "@root/src/infra/repository/category";
import {Response} from "express";

export class DeleteCategory {

    constructor(readonly categoryRepository: CategoryRepository) {}
    async execute(categoryId: string, response: Response): Promise<Response> {
        const categoryResult = await this.categoryRepository.getOne({_id: categoryId})

        if (!categoryResult) {
            return response.status(404).json({
                success: true,
                message: "Category not found",
            })
        }

        await this.categoryRepository.delete(categoryId);
        return response.status(200).json({
            success: true,
            message: "Category delete",
        })
    }
}