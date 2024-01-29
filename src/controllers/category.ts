import {Request, Response} from "express";
import {CategoryRepository} from "../../src/infra/repository/category";
import {CreateCategory} from "../../src/application/usecases/categories/create_category";
import {UpdateCategory} from "../../src/application/usecases/categories/update_category";
import {DeleteCategory} from "../../src/application/usecases/categories/delete_category";

export class CategoryController {
    static async create(request: Request, response: Response): Promise<Response>{
        const categoryRepository = new CategoryRepository();
        const createCategory = new CreateCategory(categoryRepository);
        const category = request.body;
        return createCategory.execute(category, response);
    }
    static async updateCategory(request: Request, response: Response): Promise<Response>{
        const categoryRepository = new CategoryRepository();
        const updateCategory = new UpdateCategory(categoryRepository);
        return updateCategory.execute(request, response);

    }

    static async deleteCategory(request: Request, response: Response): Promise<Response>{
        const categoryRepository = new CategoryRepository();
        const deleteCategory = new DeleteCategory(categoryRepository);
        const categoryId = request.params.id;
        return deleteCategory.execute(categoryId, response);
    }
}