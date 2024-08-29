const topicsData = require("../models/topics.model");

const getAllTopics = (req, res, next) => {
  topicsData()
    .then((topics) => {
      res.status(200).send({ topics });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = getAllTopics;
