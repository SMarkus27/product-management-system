import cors from "cors";
import express from "express";
import {productRouter} from "@root/src/infra/http/product";
import {categoryRouter} from "@root/src/infra/http/category";
import {catalogRouter} from "@root/src/infra/http/catalog";

import { config } from "dotenv";
config()

export const app = express();

app.use(cors());

app.use(express.json())

const PORT = process.env.PORT;

app.use("/api/v1/", productRouter);
app.use("/api/v1/", categoryRouter);
app.use("/api/v1/", catalogRouter);

app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));

