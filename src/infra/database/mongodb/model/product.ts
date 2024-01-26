import {model, Schema} from "mongoose";

const ProductSchema = new Schema({
    title: {
        type: String
    },

    description: {
        type: String
    },
    category: {
        type: String
    },
    price: {
        type: Number
    },
    owner_id: {
        type: String
    },
    product_id: {
        type: String
    },


})

export const ProductModel = model("Product", ProductSchema,  "product");
