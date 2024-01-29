import request from "supertest";
import {app} from "../../src/main";
import mongoose, {connect} from "mongoose";
import {CategoryRepository} from "../../src/infra/repository/category";

describe("Should create a category",  () => {

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
        await mongoose.connection.db.dropCollection("category")

    });

    it("should create category", async () => {
        const product = {
            title: "category 1",
            description: "new category",
            price: 20.55,
            category: "new category",
            owner_id: "123",
            category_id: "456"
        };
        const response = await request(app).post("/api/v1/category").send(product);
        const expectedResponse = { success: true, message: 'Category created' }

        expect(response.body).toEqual(expectedResponse);
    });

    it("should not create category", async () => {
        const category = {
            title: "products 1",
            description: "new products",
            price: 20.55,
            category: "new categories",
            owner_id: "123",
            product_id: "456"
        };

        // @ts-ignore
        jest.spyOn(CategoryRepository.prototype, "getOne").mockImplementation(async () => category )

        const response = await request(app).post("/api/v1/category").send(category);
        const expectedResponse = { success: true, message: 'Category already exist' }


        expect(response.body).toEqual(expectedResponse);
    });

    it("should update a category", async () => {

        const category = {
            title: "products 1",
            description: "new products",
            category: "new categories",
            owner_id: "123",
            category_id: "456"
        };

        const updateResult = {
            modifiedCount:  1,
            acknowledged: true,
            matchedCount: 1,
            upsertedCount: 0,
            upsertedId: "1111111"
        }

        // @ts-ignore
        jest.spyOn(CategoryRepository.prototype, "update").mockImplementation( () => updateResult )

        const response = await request(app).put(`/api/v1/category/${category.category_id}`).send(category);
        const expectedResponse = { success: true, message: 'Category updated'}

        expect(response.body).toEqual(expectedResponse);
    });

    it("should not update a category", async () => {

        const category = {
            title: "category 1",
            description: "new category",
            price: 20.55,
            category: "new categories",
            owner_id: "123",
            category_id: "456"
        };

        const updateResult = {
            modifiedCount:  0,
            acknowledged: true,
            matchedCount: 1,
            upsertedCount: 0,
            upsertedId: "1111111"
        }

        // @ts-ignore
        jest.spyOn(CategoryRepository.prototype, "update").mockImplementation( () => updateResult )

        const response = await request(app).put(`/api/v1/category/${category.category_id}`).send(category);
        const expectedResponse = { success: true, message: 'Nothing to updated' }

        expect(response.body).toEqual(expectedResponse);
    });
    it("should delete a category", async () => {
        const category_id = "456"

        const response = await request(app).delete(`/api/v1/category/${category_id}`).send();
        const expectedResponse = { success: true, message: 'Category delete' }
        expect(response.body).toEqual(expectedResponse);
    });

});