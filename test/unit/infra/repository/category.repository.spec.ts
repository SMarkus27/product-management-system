import {connect, model, Schema} from "mongoose";
import {CategoryRepository} from "../../../../src/infra/repository/category";


describe("Category Repository test", () => {
    let mongoClient;

    beforeEach(async () => {
        mongoClient = await connect(
            "mongodb://localhost:27017",
            {
                dbName: "test"
            });

    });


    it("should create a category", async () => {
        const category = {
            title: "category 1",
            description: "new category",
            category: "new categories",
            owner_id: "123",
            category_id: "456"
        };

        const categoryRepository = new CategoryRepository();
        await categoryRepository.create(category);
        const findProduct = await categoryRepository.getOne(category.category_id);
        expect(findProduct).toHaveProperty("_id");
        await categoryRepository.delete(findProduct.category_id);

    });

    it("should update a category", async () => {
        const category = {
            title: "category 1",
            description: "new category",
            category: "new categories",
            owner_id: "123",
            category_id: "456"
        };

        const newCategory = {
            title: "category 1",
            description: "new category",
            category: "new category 2",
            owner_id: "123",
            category_id: "456"
        };
        const categoryRepository = new CategoryRepository();
        await categoryRepository.create(category);
        const updateProduct = await categoryRepository.update(category.category_id, newCategory);
        expect(updateProduct.modifiedCount).toEqual(1);
        const findProduct = await categoryRepository.getOne(category.category_id);
        await categoryRepository.delete(findProduct.category_id);


    });


});