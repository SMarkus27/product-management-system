import {Category} from "@domain/entities/category";


describe("Category Entity tests", () => {

    it("should create a new categories", async () => {
        const category = {
            title: "categories 1",
            description: "new categories",
            owner_id: "123",
            category_id: "a11111"
        };

        const newCategory = await Category.create(category);
        expect(newCategory.title).toEqual("categories 1");
        expect(newCategory.description).toEqual("new categories");
        expect(newCategory.owner_id).toEqual("123");

    });

    it("should not create a categories with invalid title", async () => {
        const category = {
            title: "cat",
            description: "new categories",
            owner_id: "123",
            category_id: "a11111"
        };

        await expect(async () => await Category.create(category)).rejects.toThrow("Invalid Title");
    })
    it("should not create a categories with invalid description", async () => {
        const category = {
            title: "categories 1",
            description: "new",
            owner_id: "123",
            category_id: "a11111"
        };

        await expect(async () => await Category.create(category)).rejects.toThrow("Invalid Description");

    })

})