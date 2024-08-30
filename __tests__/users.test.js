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

describe("/api/users", () => {
  it("200 - will return all users", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then((res) => {
        const users = res.body.users;
        expect(users.length).toBe(4);
        users.forEach((user) => {
          expect(user).toHaveProperty("username", expect.any(String));
          expect(user).toHaveProperty("name", expect.any(String));
          expect(user).toHaveProperty("avatar_url", expect.any(String));
        });
      });
  });
  it("404 - responds with 'Page not found' for incorrect endpoint", () => {
    return request(app)
      .get("/api/IDontExist")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("Page not found");
      });
  });
});

describe("/api/users/:username", () => {
  it("200 - returns a single user when passed a valid username", () => {
    return request(app)
      .get("/api/users/icellusedkars")
      .expect(200)
      .then((res) => {
        const user = res.body.user;
        expect(user.username).toBe("icellusedkars");
        expect(user.name).toBe("sam");
        expect(user.avatar_url).toBe(
          "https://avatars2.githubusercontent.com/u/24604688?s=460&v=4"
        );
      });
  });
  it("404 - responds with an error when given an incorrect username", () => {
    return request(app)
      .get("/api/users/jarjarbinks")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("User not found");
      });
  });
});
