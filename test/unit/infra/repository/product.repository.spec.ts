import {connect, model, Schema} from "mongoose";
import {ProductModel} from "../../../../src/infra/database/mongodb/model/product";
import {ProductRepository} from "../../../../src/infra/repository/product";


describe("Product Repository test", () => {
    let mongoClient;

    beforeEach(async () => {
        mongoClient = await connect(
            "mongodb://localhost:27017",
            {
                dbName: "test"
            });

    });


    it("should create a product", async () => {
        const product = {
            title: "products 1",
            description: "new products",
            price: 20.55,
            category: "new categories",
            owner_id: "123",
            product_id: "456"
        };

        const productRepository = new ProductRepository();
        await productRepository.create(product);
        const findProduct = await productRepository.getOne(product.product_id);
        expect(findProduct).toHaveProperty("_id");
        await productRepository.delete(findProduct.product_id);

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

        const newProduct = {
            title: "products 1",
            description: "new products",
            price: 20.55,
            category: "new categories 2",
            owner_id: "123",
            product_id: "456"
        };
        const productRepository = new ProductRepository();
        await productRepository.create(product);
        const updateProduct = await productRepository.update(product.product_id, newProduct);
        expect(updateProduct.modifiedCount).toEqual(1);
        const findProduct = await productRepository.getOne(product.product_id);
        await productRepository.delete(findProduct.product_id);


    });


    it("should get all product", async () => {
        const product1 = {
            title: "products 1",
            description: "new products",
            price: 20.55,
            category: "new categories",
            owner_id: "123",
            product_id: "456"
        };

        const product2 = {
            title: "products 2",
            description: "new products",
            price: 30.55,
            category: "new categories 2",
            owner_id: "123",
            product_id: "789"
        };
        const productRepository = new ProductRepository();
        await productRepository.create(product1);
        await productRepository.create(product2);

        const allProduct = await productRepository.getAll(product1.owner_id);
        expect(allProduct.length > 1).toEqual(true);

        allProduct.map(async (item) => {
            await productRepository.delete(item.product_id);

        })

    });

});