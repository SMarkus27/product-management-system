import {ProductType} from "@domain/entities/types/product";
import {UpdateWriteOpResult} from "mongoose";

export interface IProductRepository {
    create(product: ProductType): Promise<void>;
    update(productId: string, product: ProductType): Promise<UpdateWriteOpResult>;
    getOne(productId: string): Promise<ProductType | undefined>;
    getAll(ownerId: string): Promise<ProductType[]>;
    delete(productId: string): Promise<void>;
}