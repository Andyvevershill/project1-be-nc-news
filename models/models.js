const format = require("pg-format");
const db = require("../db/connection");

const topicsData = (req) => {
  return db.query("SELECT * FROM topics").then(({ rows }) => {
    return rows;
  });
};

module.exports = topicsData;
