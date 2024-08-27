const getArticle = require("../models/articles.model");

const getArticleByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  getArticle(article_id)
    .then((article) => {
      if (article.length === 0) {
        return res.status(404).send({ msg: "Article not found" });
      }
      res.status(200).send({ article: article[0] });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = getArticleByArticleId;
