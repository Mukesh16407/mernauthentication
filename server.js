const express = require("express");
require("dotenv").config();
const app = express();




app.use(express.json());

const mongodbConnection = require("./config/mongodbConnection");

const port = 5000;

app.listen(port, () => console.log(`Node JS Server Running On Port ${port}!`));