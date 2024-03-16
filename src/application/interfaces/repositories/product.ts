import {ProductType} from "@domain/entities/types/product";
import {UpdateWriteOpResult} from "mongoose";

export interface IProductRepository {
    create(product: ProductType): Promise<void>;
    update(productId: string, product: ProductType): Promise<UpdateWriteOpResult>;
    getOne(filter: object): Promise<ProductType | undefined>;
    getAll(): Promise<ProductType[]>;
    delete(productId: string): Promise<void>;
}