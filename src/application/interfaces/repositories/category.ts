import {CategoryType} from "@domain/entities/types/category";
import {UpdateWriteOpResult} from "mongoose";

export interface ICategoryRepository {
    create(category: CategoryType): Promise<void>;
    update(category_id: string, category: CategoryType): Promise<UpdateWriteOpResult>;
    getOne(filter: object): Promise<CategoryType | undefined>;
    getAll(): Promise<CategoryType[]>;
    delete(category_id: string): Promise<void>;
}