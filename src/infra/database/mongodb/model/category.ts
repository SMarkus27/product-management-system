import {model, Schema} from "mongoose";

const CategorySchema = new Schema({
    title: {
        type: String
    },

    description: {
        type: String
    },
    category: {
        type: String
    },
    owner_id: {
        type: String
    },
    category_id: {
        type: String
    },


});

export const CategoryModel = model("Category", CategorySchema,  "category");
