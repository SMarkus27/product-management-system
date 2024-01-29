import {CategoryType} from "@domain/entities/types/category";
import {UpdateWriteOpResult} from "mongoose";

export interface ICategoryRepository {
    create(category: CategoryType): Promise<void>;
    update(category_id: string, category: CategoryType): Promise<UpdateWriteOpResult>;
    getOne(category_id: string): Promise<CategoryType | undefined>;
    delete(category_id: string): Promise<void>;
}