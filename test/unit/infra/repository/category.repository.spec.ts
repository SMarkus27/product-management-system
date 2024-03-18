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
            owner_id: "123",
        };

        const categoryRepository = new CategoryRepository();
        await categoryRepository.create(category);
        const findProduct = await categoryRepository.getOne({title: category.title});
        expect(findProduct).toHaveProperty("_id");

    });

    it("should update a category", async () => {
        const category = {
            title: "category 1",
            description: "new category",
            owner_id: "123",
        };

        const newCategory = {
            title: "category 1",
            description: "new category2",
            owner_id: "123",
        };
        const categoryRepository = new CategoryRepository();
        await categoryRepository.create(category);
        const categoryResult = await categoryRepository.getOne({title: category.title})
        console.log(categoryResult)
        const updateProduct = await categoryRepository.update(categoryResult["_id"], newCategory);
        expect(updateProduct.modifiedCount).toEqual(1);


    });


});