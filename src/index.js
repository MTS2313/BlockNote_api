const express = require("express");
const sql = require("mssql");
const config = require("./connect");
const app = express();
const DB = require("./connect");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const routers = require("./routes");

app.use(express.json());

app.use(routers);

app.listen("8080", () => {
  console.log("Api em execução");
});
console.clear();
