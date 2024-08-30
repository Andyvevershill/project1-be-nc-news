const { getAllUsers, getUserByUsername } = require("../models/users.model");

const getUsers = (req, res, next) => {
  getAllUsers()
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch((err) => {
      next(err);
    });
};

const getUsername = (req, res, next) => {
  const { username } = req.params;
  getUserByUsername(username)
    .then((user) => {
      res.status(200).send({ user });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = { getUsers, getUsername };
