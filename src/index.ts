const express = require('express');
const cors = require("cors");
const app = express();
import connectDB from "./database/conn";

app.use(cors());
app.use(express.json());

app.listen(3000, function () {
    console.log("servidor online");
});

connectDB();