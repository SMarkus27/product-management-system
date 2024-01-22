import {Category} from "@domain/entities/category";


describe("Category Entity tests", () => {

    it("should create a new category", async () => {
        const category = {
            title: "category 1",
            description: "new category",
            ownerId: "123"
        };

        const newCategory = await Category.create(category);
        expect(newCategory.title.getValue()).toEqual("category 1");
        expect(newCategory.description.getValue()).toEqual("new category");
        expect(newCategory.ownerId).toEqual("123");

    });

    it("should not create a category with invalid title", async () => {
        const product = {
            title: "cat",
            description: "new category",
            ownerId: "123"
        };

        await expect(async () => await Category.create(product)).rejects.toThrow("Invalid Title");
    })
    it("should not create a category with invalid description", async () => {
        const product = {
            title: "category 1",
            description: "new",
            ownerId: "123"
        };

        await expect(async () => await Category.create(product)).rejects.toThrow("Invalid Description");

    })

})