const request = require("supertest");
const app = require("../app.js");
const db = require("../db/connection.js");
const seed = require("../db/seeds/seed.js");
const data = require("../db/data/test-data/index.js");
require("jest-sorted");

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
        expect(Object.keys(article).length).toBe(9);
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
        expect(article).toHaveProperty("comment_count", expect.any(Number));
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
  it("200 - returns an updated article that has been changed by the value of newVote", () => {
    const newVotes = { inc_votes: 50 };
    return request(app)
      .patch("/api/articles/1")
      .send(newVotes)
      .expect(200)
      .then((res) => {
        const { article } = res.body;
        expect(article.votes).toBe(150);
      });
  });
  test("400 - responds with an error when inc_votes is missing", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({})
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Bad Request");
      });
  });
  test("400 - responds with an error when inc_votes is not a number", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({ inc_votes: "one" })
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Bad Request");
      });
  });
  test("404 - responds with an error when article_id does not exist", () => {
    return request(app)
      .patch("/api/articles/9999")
      .send({ inc_votes: 1 })
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("Article not found");
      });
  });
});

describe("/api/articles", () => {
  it("will return an array of article objects with the body property being replaced by a comment_count and sorted by date in descending order", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((res) => {
        const { articles } = res.body;
        expect(articles.length).toBe(13);
        articles.forEach((article) => {
          expect(article).toHaveProperty("author");
          expect(article).toHaveProperty("title");
          expect(article).toHaveProperty("article_id");
          expect(article).toHaveProperty("topic");
          expect(article).toHaveProperty("created_at");
          expect(article).toHaveProperty("votes");
          expect(article).toHaveProperty("article_img_url");
          expect(article).toHaveProperty("comment_count");
          expect(articles[0].created_at).toEqual("2020-11-03T09:12:00.000Z");
          expect(articles[12].created_at).toEqual("2020-01-07T14:08:00.000Z");
        });
      });
  });
  it("allows sorting articles by a valid column (votes)", () => {
    return request(app)
      .get("/api/articles?sort_by=votes")
      .expect(200)
      .then((res) => {
        const { articles } = res.body;
        expect(articles).toBeSortedBy("votes", { descending: true });
      });
  });
  it("will default the comment_count to 0 if there is no mention of the article", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((res) => {
        const { articles } = res.body;
        expect(Number(articles[3].comment_count)).toEqual(0);
      });
  });
  it("returns articles filtered by topic", () => {
    return request(app)
      .get("/api/articles?topic=mitch")
      .expect(200)
      .then((res) => {
        const { articles } = res.body;
        expect(articles.length).toBeGreaterThan(0);
        articles.forEach((article) => {
          expect(article.topic).toBe("mitch");
        });
      });
  });
  it("returns all articles if topic is omitted", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((res) => {
        const { articles } = res.body;
        expect(articles.length).toBeGreaterThan(0);
      });
  });
  it("responds with an error when trying to sort by an invalid input", () => {
    return request(app)
      .get("/api/articles?sort_by=NOTATHING")
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Invalid sort_by");
      });
  });
  it("responds with an arror when trying to order by an invalid order", () => {
    return request(app)
      .get("/api/articles?order=uptodown")
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Invalid order");
      });
  });
  it("responds with an error when sort_by is invalid", () => {
    return request(app)
      .get("/api/articles?sort_by=invalid")
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Invalid sort_by");
      });
  });
});
