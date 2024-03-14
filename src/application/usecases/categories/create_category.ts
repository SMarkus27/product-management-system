import {v4 as uuid4} from "uuid";

import {CategoryRepository} from "@root/src/infra/repository/category";
import {CategoryType} from "@domain/entities/types/category";
import {Response} from "express";
import {Category} from "@domain/entities/category";

export class CreateCategory {

    constructor(readonly categoryRepository: CategoryRepository) {}

    async execute(category: CategoryType, response: Response): Promise<Response> {
        const validCategory = await Category.create(category);

        const title = validCategory.title.toLowerCase();
        const categoryExist = await this.categoryRepository.getOne(title);
        if (categoryExist) {
            return response.status(200).json({
                success: true,
                message: "Category already exist",
            })
        }

        await this.categoryRepository.create(validCategory);
        return response.status(200).json({
            success: true,
            message: "Category created",
        })
    }
}