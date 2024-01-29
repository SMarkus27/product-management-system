const express = require("express");
// const cors = require("cors")
const productRouter = require("../src/infra/http/product");
const categoryRouter = require("../src/infra/http/category");

export const app = express();

// app.use(cors());

app.use(express.json())

const PORT = process.env.PORT;

app.use("/api/v1/", productRouter);
app.use("/api/v1/", categoryRouter);

app.listen(3000, () => console.log(`Server running on PORT: ${3000}`));


