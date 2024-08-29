const db = require("../db/connection");

const getArticle = (article_id) => {
  return db
    .query("SELECT * FROM articles WHERE article_id = $1", [article_id])
    .then(({ rows }) => {
      return rows;
    });
};

const getAllArticles = () => {
  return db
    .query(
      `SELECT
    articles.article_id,
    articles.author,
    articles.topic,
    articles.created_at,
    articles.votes,
    articles.title,
    articles.article_img_url,
    COALESCE(COUNT(comments.article_id), 0) AS comment_count
    FROM articles
    LEFT JOIN comments ON articles.article_id = comments.article_id
    GROUP BY articles.article_id
    ORDER BY articles.created_at DESC`
    )
    .then(({ rows }) => {
      return rows;
    });
};

module.exports = { getArticle, getAllArticles };
