import { connect } from "mongoose";
import * as mongoose from "mongoose";

export class MongoDBInfrastructure  {

    async getClient(): Promise<mongoose.Mongoose>{
        try {
            const mongoClient = await connect(
                "mongodb://localhost:27017",
                {
                    dbName: "catalog",
                })

            return mongoClient
        }
        catch (error) {
            throw new Error("MongoDB Connection Error")

        }
    }
}

