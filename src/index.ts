import express from "express";
import cors from 'cors'
import bodyParser from "body-parser";
const app = express();
import connectDB from "./database/conn";

app.use(cors());
app.use(bodyParser.json())

import routes from "./routes/router";

app.use("/api", routes)

app.listen(3000, function () {
    console.log(`servidor online e rodando na porta`);
});

connectDB();