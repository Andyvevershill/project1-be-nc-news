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

describe("/api/articles/:article_id", () => {
  it("200 - will return the correct article when used a valid article id", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then((res) => {
        const article = res.body.article;
        console.log(article);
        expect(Object.keys(article).length).toBe(8);
        expect(article.article_id).toBe(1);
        expect(article.title).toBe("Living in the shadow of a great man");
        expect(article.topic).toBe("mitch");
        expect(article.author).toBe("butter_bridge");
        expect(article.body).toBe("I find this existence challenging");
        expect(article).toHaveProperty("created_at", expect.any(String));
        expect(article.votes).toBe(100);
        expect(article.article_img_url).toBe(
          "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700"
        );
      });
  });
  it("404 - responds with an appropriate error when article_id does not exist", () => {
    return request(app)
      .get("/api/articles/600")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("Article not found");
      });
  });
});
