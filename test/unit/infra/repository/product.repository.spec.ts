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
        };

        const productRepository = new ProductRepository();
        await productRepository.create(product);
        const findProduct = await productRepository.getOne({title: product.title});
        expect(findProduct).toHaveProperty("_id");

    });

    it("should update a product", async () => {
        const product = {
            title: "products 1",
            description: "new products",
            price: 20.55,
            category: "new categories",
            owner_id: "123",
        };

        const newProduct = {
            title: "products 2",
            description: "new products",
            price: 20.55,
            category: "new categories 2",
            owner_id: "123",
        };
        const productRepository = new ProductRepository();
        await productRepository.create(product);
        const productResult = await productRepository.getOne({title: product.title})
        const updateProduct = await productRepository.update(productResult["_id"], newProduct);
        expect(updateProduct.modifiedCount).toEqual(1);


    });


    it("should get all product", async () => {
        const product1 = {
            title: "products 1",
            description: "new products",
            price: 20.55,
            category: "new categories",
            owner_id: "123",
        };

        const product2 = {
            title: "products 2",
            description: "new products",
            price: 30.55,
            category: "new categories 2",
            owner_id: "123",
        };
        const productRepository = new ProductRepository();
        await productRepository.create(product1);
        await productRepository.create(product2);

        const allProduct = await productRepository.getAll();
        expect(allProduct.length > 1).toEqual(true);

        allProduct.map(async (item) => {
            await productRepository.delete(item["_id"]);

        })

    });

});