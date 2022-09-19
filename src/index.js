const express = require("express");
const app = express();
require('dotenv').config({path:'/media/mateus/AllOsStorege_Mad/Dev/BlockNote_api/src/.env'});
const routers = require("./routes");

app.use(express.json());

app.use(routers);

app.listen("8080", () => {
  console.log("Api em execução");
});
console.clear();
