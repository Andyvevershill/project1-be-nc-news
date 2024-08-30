const db = require("../db/connection");

getCommentsByArticleId = (article_id) => {
  return db
    .query(
      `SELECT comment_id, votes, created_at, author, body, article_id FROM comments 
        WHERE article_id = $1
        ORDER BY created_at DESC;`,
      [article_id]
    )
    .then(({ rows }) => {
      return rows;
    });
};

const addCommentToArticle = (article_id, username, body) => {
  return db
    .query(
      `INSERT INTO comments (article_id, author, body, votes, created_at)
        VALUES ($1, $2, $3, 0, NOW())
        RETURNING *;`,
      [article_id, username, body]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

const deleteCommentByCommentId = (comment_id) => {
  return db
    .query(
      `DELETE FROM comments 
    WHERE comment_id = $1
    RETURNING*;`,
      [comment_id]
    )
    .then(({ rows }) => {
      return rows.length > 0;
    });
};

module.exports = {
  getCommentsByArticleId,
  addCommentToArticle,
  deleteCommentByCommentId,
};
