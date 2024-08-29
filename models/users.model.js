const db = require("../db/connection");

const getAllUsers = () => {
  return db
    .query("SELECT * FROM users;")
    .then(({ rows }) => {
      console.log(rows);
      return rows;
    })
    .catch((err) => {
      console.error("Cannot read rows", err);
      throw err;
    });
};

module.exports = getAllUsers;
