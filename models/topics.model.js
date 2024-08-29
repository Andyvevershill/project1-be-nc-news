const db = require("../db/connection");

const topicsData = () => {
  return db.query("SELECT * FROM topics;").then(({ rows }) => {
    return rows;
  });
};

module.exports = topicsData;
