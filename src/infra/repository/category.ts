import { CategoryType } from "@domain/entities/types/category";
import {ICategoryRepository} from "../../../src/application/interfaces/repositories/category";
import {UpdateWriteOpResult} from "mongoose";
import {MongoDBInfrastructure} from "../../../src/infra/database/mongodb/database";
import {CategoryModel} from "../../../src/infra/database/mongodb/model/category";

export class CategoryRepository implements ICategoryRepository {

    private readonly mongoClient;
    constructor() {
        const mongoClient = new MongoDBInfrastructure();
        this.mongoClient = mongoClient.getClient();
    }

    async create(category: CategoryType): Promise<void> {
        await this.mongoClient;
        await CategoryModel.create(category);
    }
    async update(categoryId: string, category: CategoryType): Promise<UpdateWriteOpResult> {
        await this.mongoClient;
        const updateResult = await CategoryModel.updateOne({category_id: categoryId}, {...category})
        return updateResult
    }
    async getOne(categoryId: string): Promise<CategoryType> {
        await this.mongoClient;
        return CategoryModel.findOne({category_id: categoryId});
    }
    async delete(categoryId: string): Promise<void> {
        await this.mongoClient;
        await CategoryModel.deleteOne({category_id: categoryId})

    }

}