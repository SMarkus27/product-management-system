import {Request, Response} from "express";
import {CategoryRepository} from "@root/src/infra/repository/category";
import {Category} from "@domain/entities/category";

export class UpdateCategory {
    constructor(readonly categoryRepository: CategoryRepository) {}


    async execute(request: Request, response: Response): Promise<Response> {
        const category = request.body;
        const categoryId = request.params.id;

        const validCategory = await Category.create(category);

        const categoryResult = await this.categoryRepository.getOne({title: category.title})

        if (!categoryResult) {
            return response.status(404).json({
                success: true,
                message: "Category not found",
            })
        }

        const updateResult = await this.categoryRepository.update(categoryId, validCategory);
        if (updateResult.modifiedCount > 0) {
            return response.status(200).json({
                success: true,
                message: "Category updated",
            })
        }
        return response.status(200).json({
            success: true,
            message: "Nothing to updated",
        })

    }
}