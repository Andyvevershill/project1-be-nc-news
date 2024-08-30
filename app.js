const express = require("express");
const app = express();
const getAllTopics = require("./controllers/topics.controller.js");
const getApis = require("./controllers/apis.controller.js");

const {
  getArticleByArticleId,
  getArticles,
  changeArticleVotes,
} = require("./controllers/articles.controller.js");

const {
  postComments,
  getComments,
} = require("./controllers/comments.controller.js");

const getUsers = require("./controllers/users.controller.js");

app.use(express.json());

app.get("/api/topics", getAllTopics);
app.get("/api", getApis);
app.get("/api/articles/:article_id", getArticleByArticleId);
app.get("/api/articles", getArticles);
app.get("/api/articles/:article_id/comments", getComments);
app.post("/api/articles/:article_id/comments", postComments);
app.patch("/api/articles/:article_id", changeArticleVotes);
app.get("/api/users", getUsers);

app.all("/*", (req, res, next) => {
  res.status(404).send({ msg: "Page not found" });
});

app.use((req, res, next) => {
  if (error.code === "22PO2") {
    res.status(400).send({ msg: "Invalid ID" });
  }
  res.status(404).send({ msg: "URL not found" });
});

app.use((req, res, next) => {
  if (err.code === "23503") {
    res.status(404).send({ msg: "not found" });
  }
});

app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    res.status(500).send({ msg: "Internal Server Error" });
  }
});

module.exports = app;
