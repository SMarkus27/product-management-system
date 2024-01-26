import { ProductType } from "@domain/entities/types/product";
import {IProductRepository} from "../../../../src/application/interfaces/repositories/products/interface";
import {MongoDBInfrastructure} from "../../database/mongodb/database";
import {ProductModel} from "../../database/mongodb/model/product";
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
        const updateResult = await ProductModel.updateOne({product_id: productId}, {...product})
        return updateResult
    }

    async getOne(productId: string): Promise<ProductType> {
        await this.mongoClient;
        return ProductModel.findOne({product_id: productId});
    }
    async getAll(ownerId: string): Promise<ProductType[]> {
        await this.mongoClient;
        return ProductModel.find({owner_id: ownerId});
    }
    async delete(productId: string): Promise<void> {
        await this.mongoClient;
        await ProductModel.deleteOne({product_id: productId})
    }


}