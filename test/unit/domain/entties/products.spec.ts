import {ProductType} from "@domain/entities/types/product";
import {Products} from "@domain/entities/products";

describe("Product Entity tests", () => {

    it("should create a new Product", async () => {
        const product = {
            title: "products 1",
            description: "new products",
            price: 20.55,
            category: "new categories",
            owner_id: "123",
        };

        const newProduct = await Products.create(product);
        expect(newProduct.title).toEqual("products 1");
        expect(newProduct.description).toEqual("new products");
        expect(newProduct.price).toEqual(20.55);
        expect(newProduct.category).toEqual("new categories");
        expect(newProduct.owner_id).toEqual("123");

    });

    it("should not create a products with invalid title", async () => {
        const product = {
            title: "prod",
            description: "new products",
            price: 20.55,
            category: "new categories",
            owner_id: "123",

        };

        await expect(async () => await Products.create(product)).rejects.toThrow("Invalid Title");
    })
    it("should not create a products with invalid description", async () => {
        const product = {
            title: "products 1",
            description: "new",
            price: 20.55,
            category: "new categories",
            owner_id: "123",

        };

        await expect(async () => await Products.create(product)).rejects.toThrow("Invalid Description");

    })
    it("should not create a products with invalid price", async () => {
        const product = {
            title: "products 1",
            description: "new products",
            price: -1,
            category: "new categories",
            owner_id: "123",

        };

        await expect(async () => await Products.create(product)).rejects.toThrow("Price must be more than zero");

    })

})