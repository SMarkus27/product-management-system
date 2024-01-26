import {ProductType} from "@domain/entities/types/product";
import {Products} from "@domain/entities/products";

describe("Product Entity tests", () => {

    it("should create a new Product", async () => {
        const product = {
            title: "products 1",
            description: "new products",
            price: 20.55,
            category: "new category",
            owner_id: "123",
            product_id: "456"
        };

        const newProduct = await Products.create(product);
        expect(newProduct.title.getValue()).toEqual("products 1");
        expect(newProduct.description.getValue()).toEqual("new products");
        expect(newProduct.price.getValue()).toEqual(20.55);
        expect(newProduct.category).toEqual("new category");
        expect(newProduct.owner_id).toEqual("123");
        expect(newProduct.product_id).toEqual("456");

    });

    it("should not create a products with invalid title", async () => {
        const product = {
            title: "prod",
            description: "new products",
            price: 20.55,
            category: "new category",
            owner_id: "123",
            product_id: "456"

        };

        await expect(async () => await Products.create(product)).rejects.toThrow("Invalid Title");
    })
    it("should not create a products with invalid description", async () => {
        const product = {
            title: "products 1",
            description: "new",
            price: 20.55,
            category: "new category",
            owner_id: "123",
            product_id: "456"

        };

        await expect(async () => await Products.create(product)).rejects.toThrow("Invalid Description");

    })
    it("should not create a products with invalid price", async () => {
        const product = {
            title: "products 1",
            description: "new products",
            price: -1,
            category: "new category",
            owner_id: "123",
            product_id: "456"

        };

        await expect(async () => await Products.create(product)).rejects.toThrow("Price must be more than zero");

    })

})