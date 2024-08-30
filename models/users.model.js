const db = require("../db/connection");

const getAllUsers = () => {
  return db
    .query("SELECT * FROM users;")
    .then(({ rows }) => {
      return rows;
    })
    .catch((err) => {
      console.error("Cannot read rows", err);
      throw err;
    });
};

const getUserByUsername = (username) => {
  return db
    .query(
      `SELECT username, avatar_url, name FROM users WHERE users.username = $1;`,
      [username]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "User not found" });
      }

      return rows[0];
    });
};

module.exports = { getAllUsers, getUserByUsername };
