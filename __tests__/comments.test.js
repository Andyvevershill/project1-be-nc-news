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

describe("/api/articles/:article_id/comments", () => {
  it("200 - will return the correct array of comments of selected article_id", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then((res) => {
        const comments = res.body.comments;
        expect(Array.isArray(comments)).toBe(true);
        comments.forEach((comment) => {
          expect(comment).toHaveProperty("comment_id", expect.any(Number));
          expect(comment).toHaveProperty("votes", expect.any(Number));
          expect(comment).toHaveProperty("created_at", expect.any(String));
          expect(comment).toHaveProperty("author", expect.any(String));
          expect(comment).toHaveProperty("article_id", expect.any(Number));
          expect(comment).toHaveProperty("body", expect.any(String));
        });
      });
  });
  it("204- will return undefined when a valid article_id is used but there are no comments", () => {
    return request(app)
      .get("/api/articles/4/comments")
      .expect(204)
      .then((res) => {
        expect(res.body.msg).toBe(undefined);
      });
  });
  it("201 - will successfully add a new comment", () => {
    const newComment = {
      username: "lurker",
      body: "I hated this book",
    };
    return request(app)
      .post("/api/articles/1/comments")
      .send(newComment)
      .expect(201)
      .then((res) => {
        const comment = res.body.comment;
        expect(comment.author).toBe("lurker");
        expect(comment.body).toBe("I hated this book");
        expect(comment).toHaveProperty("votes");
        expect(comment).toHaveProperty("created_at");
      });
  });
  it("400 - sends an appropriate status and error message when an invalid_id is used", () => {
    const newComment = {
      name: "lurker",
      comment: "I hated this book",
    };
    return request(app)
      .post("/api/articles/dontthinkso/comments")
      .send(newComment)
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Bad request");
      });
  });
});

describe("/api/comments/:comment_id", () => {
  it("204 - successfully deletes the comment requested by comment_id", () => {
    return request(app).delete("/api/comments/1").expect(204);
  });
  test("404 - responds with an error when comment_id does not exist", () => {
    return request(app)
      .delete("/api/comments/9999")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("Comment not found");
      });
  });
});

describe("/api/comments/:comment_id", () => {
  it("200 - successfully updates the votes on a comment by the new object value", () => {
    return request(app)
      .patch("/api/comments/2")
      .send({ inc_votes: 1 })
      .expect(200)
      .then((res) => {
        const { comment } = res.body;
        expect(comment).toHaveProperty("comment_id");
        expect(comment.votes).toBe(15);
      });
  });
  it("400 - responds with appropriate error when inc_votes is not a number", () => {
    return request(app)
      .patch("/api/comments/1")
      .send({ inc_votes: "one" })
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Invalid input");
      });
  });

  it("404 - responds with appropriate error when comment_id does not exist", () => {
    return request(app)
      .patch("/api/comments/9999")
      .send({ inc_votes: 1 })
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("Comment not found");
      });
  });

  it("400 - responds with appropriate error when inc_votes is missing", () => {
    return request(app)
      .patch("/api/comments/1")
      .send({})
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Invalid input");
      });
  });
});
