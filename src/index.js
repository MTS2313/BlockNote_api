const express = require("express");
const app = express();
require("dotenv").config({
  path: "/media/mateus/AllOsStorege_Mad/Dev/BlockNote_api/src/.env",
});
const routers = require("./routes");
const cors = require("cors");
const corsOption = {
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}
app.use(express.json());
app.use(
  cors(corsOption)
);

app.use(routers);
app.listen("8080", () => {
  console.log("Api em execução");
});
console.clear();
