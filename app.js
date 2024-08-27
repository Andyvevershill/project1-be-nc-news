const express = require("express");
const app = express();
const getAllTopics = require("./controllers/topics.controller.js");
const getApis = require("./controllers/apis.controller.js");

app.use(express.json());

app.get("/api/topics", getAllTopics);
app.get("/api", getApis);

app.use((req, res, next) => {
  res.status(404).send({ msg: "URL not found" });
});

module.exports = app;
