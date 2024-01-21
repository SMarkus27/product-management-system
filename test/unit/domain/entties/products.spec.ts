import {ProductType} from "@domain/entities/types/product";
import {Products} from "@domain/entities/products";

describe("Product Entity tests", () => {

    it("should create a new Product", async () => {
        const product = {
            title: "product 1",
            description: "new product",
            price: 20.55,
            category: "new category",
            ownerId: "123"
        };

        const newProduct = await Products.create(product);
        expect(newProduct.title.getValue()).toEqual("product 1");
        expect(newProduct.description.getValue()).toEqual("new product");
        expect(newProduct.price.getValue()).toEqual(20.55);
        expect(newProduct.category).toEqual("new category");
        expect(newProduct.ownerId).toEqual("123");

    });

    it("should not create a product with invalid title", async () => {
        const product = {
            title: "prod",
            description: "new product",
            price: 20.55,
            category: "new category",
            ownerId: "123"
        };

        await expect(async () => await Products.create(product)).rejects.toThrow("Invalid Title");
    })
    it("should not create a product with invalid description", async () => {
        const product = {
            title: "product 1",
            description: "new",
            price: 20.55,
            category: "new category",
            ownerId: "123"
        };

        await expect(async () => await Products.create(product)).rejects.toThrow("Invalid Description");

    })
    it("should not create a product with invalid price", async () => {
        const product = {
            title: "product 1",
            description: "new product",
            price: -1,
            category: "new category",
            ownerId: "123"
        };

        await expect(async () => await Products.create(product)).rejects.toThrow("Price must be more than zero");

    })

})