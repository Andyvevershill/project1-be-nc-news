const {
  getCommentsByArticleId,
  addCommentToArticle,
  deleteCommentByCommentId,
} = require("../models/comments.model");

const getComments = (req, res, next) => {
  const { article_id } = req.params;
  getCommentsByArticleId(article_id)
    .then((comments) => {
      if (comments.length === 0) {
        return res.status(204).send({});
      }
      res.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
    });
};

const postComments = (req, res, next) => {
  const { article_id } = req.params;
  const { username, body } = req.body;

  if (!username || !body) {
    return res.status(400).send({ msg: "Bad request" });
  }

  addCommentToArticle(article_id, username, body)
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch((err) => {
      console.log(err);
      if (err.code === "23503") {
        res.status(404).send({ msg: "not found" });
      } else {
        next(err);
      }
    });
};

const deleteComment = (req, res, next) => {
  const { comment_id } = req.params;

  deleteCommentByCommentId(comment_id)
    .then((comment) => {
      console.log(comment);
      if (!comment) {
        return res.status(404).send({ msg: "Comment not found" });
      } else {
        res.status(204).send();
      }
    })
    .catch((err) => {
      if (err) {
        next(err);
      }
    });
};

module.exports = { getComments, postComments, deleteComment };
