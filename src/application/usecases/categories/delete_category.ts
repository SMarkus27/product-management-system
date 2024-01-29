import {CategoryRepository} from "@root/src/infra/repository/category";
import {Response} from "express";

export class DeleteCategory {

    constructor(readonly categoryRepository: CategoryRepository) {}
    async execute(categoryId: string, response: Response): Promise<Response> {
        await this.categoryRepository.delete(categoryId);
        return response.status(200).json({
            success: true,
            message: "Category delete",
        })
    }
}