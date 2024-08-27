const { fs, promises } = require("fs");

const selectApis = () => {
  return promises
    .readFile("./endpoints.json", "utf-8")
    .then((endpoints) => {
      console.log(endpoints);
      return JSON.parse(endpoints);
    })
    .catch((err) => {
      console.error("Cannot read or parse endpoints.json", err);
      throw err;
    });
};

module.exports = selectApis;
