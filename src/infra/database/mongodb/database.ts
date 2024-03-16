import { connect } from "mongoose";
import * as mongoose from "mongoose";

import { config } from "dotenv";
import * as process from "process";
config()

export class MongoDBInfrastructure  {

    async getClient(): Promise<mongoose.Mongoose>{
        try {
            const mongoClient = await connect(
                process.env.MONGODB_STRING_CONNECTION,
                {
                    dbName: process.env.MONGODB_DATABASE_NAME,
                })

            return mongoClient
        }
        catch (error) {
            throw new Error("MongoDB Connection Error")

        }
    }
}

