const express = require("express");
const app = express();
const getAllTopics = require("./controllers/topics.controller.js");
const getApis = require("./controllers/apis.controller.js");
const {
  getArticleByArticleId,
  getArticles,
} = require("./controllers/articles.controller.js");

app.use(express.json());

app.get("/api/topics", getAllTopics);
app.get("/api", getApis);
app.get("/api/articles/:article_id", getArticleByArticleId);
app.get("/api/articles", getArticles);

app.use((req, res, next) => {
  res.status(404).send({ msg: "URL not found" });
});

//app.all

module.exports = app;
