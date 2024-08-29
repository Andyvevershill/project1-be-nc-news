const request = require("supertest");
const app = require("../app.js");
const db = require("../db/connection.js");
const seed = require("../db/seeds/seed.js");
const data = require("../db/data/test-data/index.js");

beforeAll(() => {
  return seed(data);
});
afterAll(() => {
  return db.end();
});

describe("/api", () => {
  it("200 - will return all other available endpoints", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then((res) => {
        const endpoints = res.body.apis;
        expect(endpoints).toHaveProperty("GET /api");
        expect(endpoints).toHaveProperty("GET /api/articles");
        expect(endpoints).toHaveProperty("GET /api/topics");
        expect(endpoints).toHaveProperty("GET /api");
      });
  });
  it("404 - sends an error message when recieved an invalid URL", () => {
    return request(app)
      .get("/apparel")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("Page not found");
      });
  });
});
