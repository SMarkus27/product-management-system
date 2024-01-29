import request from "supertest";
import {app} from "../../src/main";
import mongoose, {connect} from "mongoose";
import {ProductRepository} from "../../src/infra/repository/product";

describe("Should create a product",  () => {

    let mongoClient: mongoose.Mongoose;

    beforeEach(async () => {
        mongoClient = await connect(
            "mongodb://localhost:27017",
            {
                dbName: "test"
            });

    });

    afterAll(async () => {
        jest.clearAllMocks();
        await mongoose.connection.db.dropCollection("product")
    });

    it("should create product", async () => {
        const product = {
            title: "products 1",
            description: "new products",
            price: 20.55,
            category: "new categories",
            owner_id: "123",
            product_id: "456"
        };
        const response = await request(app).post("/api/v1/product").send(product);
        const expectedResponse = { success: true, message: 'Product created' }

        expect(response.body).toEqual(expectedResponse);
    });

    it("should not create product", async () => {
        const product = {
            title: "products 1",
            description: "new products",
            price: 20.55,
            category: "new categories",
            owner_id: "123",
            product_id: "456"
        };
        jest.spyOn(ProductRepository.prototype, "getOne").mockImplementation(async () => product )

        const response = await request(app).post("/api/v1/product").send(product);
        const expectedResponse = { success: true, message: 'Product already exist' }


        expect(response.body).toEqual(expectedResponse);
    });

    it("should update a product", async () => {

        const product = {
            title: "products 1",
            description: "new products",
            price: 20.55,
            category: "new categories",
            owner_id: "123",
            product_id: "456"
        };

        const updateResult = {
            modifiedCount:  1,
            acknowledged: true,
            matchedCount: 1,
            upsertedCount: 0,
            upsertedId: "1111111"
        }

        // @ts-ignore
        jest.spyOn(ProductRepository.prototype, "update").mockImplementation( () => updateResult )

        const response = await request(app).put(`/api/v1/product/${product.product_id}`).send(product);
        const expectedResponse = { success: true, message: 'Product updated' }

        expect(response.body).toEqual(expectedResponse);
    });

    it("should not update a product", async () => {

        const product = {
            title: "products 1",
            description: "new products",
            price: 20.55,
            category: "new categories",
            owner_id: "123",
            product_id: "456"
        };

        const updateResult = {
            modifiedCount:  0,
            acknowledged: true,
            matchedCount: 1,
            upsertedCount: 0,
            upsertedId: "1111111"
        }

        // @ts-ignore
        jest.spyOn(ProductRepository.prototype, "update").mockImplementation( () => updateResult )

        const response = await request(app).put(`/api/v1/product/${product.product_id}`).send(product);
        const expectedResponse = { success: true, message: 'Nothing to updated' }

        expect(response.body).toEqual(expectedResponse);
    });
    it("should delete a product", async () => {
        const product_id = "456"

        const response = await request(app).delete(`/api/v1/product/${product_id}`).send();
        const expectedResponse = { success: true, message: 'Product delete' }
        expect(response.body).toEqual(expectedResponse);
    });

});