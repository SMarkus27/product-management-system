import { ProductType } from "@domain/entities/types/product";
import {IProductRepository} from "../../application/interfaces/repositories/product";
import {MongoDBInfrastructure} from "../database/mongodb/database";
import {ProductModel} from "../database/mongodb/model/product";
import {UpdateWriteOpResult} from "mongoose";

export class ProductRepository implements IProductRepository {

    private readonly mongoClient;
    constructor() {
        const mongoClient = new MongoDBInfrastructure();
        this.mongoClient = mongoClient.getClient();
    }


    async create(product: ProductType) {
        await this.mongoClient;
        await ProductModel.create(product);
    }
    async update(productId: string, product: ProductType): Promise<UpdateWriteOpResult> {
        await this.mongoClient;
        const updateResult = await ProductModel.updateOne({_id: productId}, {...product})
        return updateResult
    }

    async getOne(filter: object): Promise<ProductType> {
        await this.mongoClient;
        return ProductModel.findOne(filter);
    }
    async getAll(): Promise<ProductType[]> {
        await this.mongoClient;
        return ProductModel.find();
    }
    async delete(productId: string): Promise<void> {
        await this.mongoClient;
        await ProductModel.deleteOne({_id: productId})
    }


}