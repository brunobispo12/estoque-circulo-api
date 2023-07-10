import express from "express";
import cors from 'cors'
import bodyParser from "body-parser";
const app = express();
import connectDB from "./database/conn";
import dotenv from 'dotenv'

dotenv.config()
const PORT = process.env.SERVER_PORT

app.use(cors());
app.use(bodyParser.json())

import routes from "./routes/router";

app.use("/api", routes)

app.listen(PORT, function () {
    console.log(`servidor online e rodando na porta ${PORT}`);
});

connectDB();