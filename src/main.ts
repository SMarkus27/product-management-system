const express = require("express");
// const cors = require("cors")
const taskRouter = require("../src/infra/http/product");
export const app = express();

// app.use(cors());

app.use(express.json())

const PORT = process.env.PORT;

app.use("/api/v1/", taskRouter);

app.listen(3000, () => console.log(`Server running on PORT: ${3000}`));


