const db = require("../db/connection");

const getArticle = (article_id) => {
  return db
    .query("SELECT * FROM articles WHERE article_id = $1", [article_id])
    .then(({ rows }) => {
      return rows;
    });
};

const getAllArticles = (sort_by = "created_at", order = "desc") => {
  const validSortValues = [
    "article_id",
    "author",
    "topic",
    "created_at",
    "votes",
    "title",
    "comment_count",
  ];
  const validOrders = ["asc", "desc"];

  if (!validSortValues.includes(sort_by)) {
    return Promise.reject({ status: 400, msg: "Invalid sort_by" });
  }
  if (!validOrders.includes(order)) {
    return Promise.reject({ status: 400, msg: "Invalid order" });
  }

  const query = `SELECT
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
    ORDER BY ${sort_by} ${order}`;

  return db.query(query).then(({ rows }) => {
    return rows;
  });
};

const updateArticleVotes = (article_id, inc_votes) => {
  return db
    .query(
      `UPDATE articles
    SET votes = votes + $1
    WHERE article_id = $2
    RETURNING *;`,
      [inc_votes, article_id]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

module.exports = { getArticle, getAllArticles, updateArticleVotes };
