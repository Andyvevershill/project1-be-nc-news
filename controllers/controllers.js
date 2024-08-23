const topicsData = require("../models/models");

const getAllTopics = (req, res, next) => {
  topicsData()
    .then((topics) => {
      res.status(200).send({ topics });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

module.exports = getAllTopics;
