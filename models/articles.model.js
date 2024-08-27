const db = require("../db/connection");

const getArticle = (article_id) => {
  return db
    .query("SELECT * FROM articles WHERE article_id = $1", [article_id])
    .then(({ rows }) => {
      return rows;
    });
};

module.exports = getArticle;
