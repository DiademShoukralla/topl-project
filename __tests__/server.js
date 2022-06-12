/***
 * Test suite for ensuring API calls to the server behave as expected
 */

const supertest = require("supertest");
const http = require("http");
const app = require("../src/app");

// Mock external API calls
jest.mock("../src/articles/newsdata");

let server;

beforeAll(() => {
  server = http.createServer(app);
});

afterAll(() => {
  server.close();
});

const postsUrl = "/api/articles";
describe("Verify /api/articles: Validate Query Parameters", () => {
  it("num is not a number => Error", () => {
    return supertest(server)
      .get(`${postsUrl}?num=hello`)
      .expect(400)
      .then(({ body }) => {
        expect(body).toEqual({
          error: "num parameter is expected to be a number",
        });
      });
  });
  it("num is not present => Use Default", () => {
    return supertest(server)
      .get(`${postsUrl}`)
      .expect(200)
      .then(({ body }) => {
        let { count } = body;
        expect(count).toEqual(10);
      });
  });
  it("category invalid => Error", () => {
    return supertest(server)
      .get(`${postsUrl}?category=random`)
      .expect(400)
      .then(({ body }) => {
        expect(body).toEqual({ error: "category parameter is invalid" });
      });
  });
});

describe("Verify /api/articles: Response is as expected", () => {
  it("Verify num articles returned (no query)", () => {
    // Fetch 11 checks more than 1 page and less than a page at the same time
    let num = 11;
    return supertest(server)
      .get(`${postsUrl}?num=${num}`)
      .expect(200)
      .then(({ body }) => {
        let { count, articles } = body;
        expect(count).toEqual(num);
        expect(articles.length).toEqual(num);
      });
  });
  it("Verify querying category", () => {
    return supertest(server)
      .get(`${postsUrl}?category=politics`)
      .expect(200)
      .then(({ body }) => {
        let { count, articles } = body;
        expect(count).toEqual(1);
        expect(articles[0].title).toEqual("article8");
      });
  });
  it("Verify querying keywords", () => {
    return supertest(server)
      .get(`${postsUrl}?keywords=dinosaur`)
      .expect(200)
      .then(({ body }) => {
        let { count, articles } = body;
        expect(count).toEqual(3);
        expect(articles.map((a) => a.title)).toEqual([
          "article1",
          "article4",
          "article5",
        ]);
      });
  });
  it("Verify querying keywords => keyword does not exist", () => {
    return supertest(server)
      .get(`${postsUrl}?keywords=random`)
      .expect(200)
      .then(({ body }) => {
        let { count, articles } = body;
        expect(count).toEqual(0);
        expect(articles).toEqual([]);
      });
  });
  it("Verify querying category => category does not exist", () => {
    return supertest(server)
      .get(`${postsUrl}?category=business`)
      .expect(200)
      .then(({ body }) => {
        let { count, articles } = body;
        expect(count).toEqual(0);
        expect(articles).toEqual([]);
      });
  });
  it("Verify querying keywords and category and num", () => {
    return supertest(server)
      .get(`${postsUrl}?keywords=dinosaur&category=science&num=1`)
      .expect(200)
      .then(({ body }) => {
        let { count, articles } = body;
        expect(count).toEqual(1);
        expect(articles[0].title).toEqual("article4");
      });
  });
  it("Verify word frequency maps", () => {
    return supertest(server)
      .get(`${postsUrl}?num=1`)
      .expect(200)
      .then(({ body }) => {
        let { count, articles } = body;
        expect(count).toEqual(1);
        expect(articles[0].metadata).toEqual({
          descWordFreq: {
            dinosaur: 1,
            a: 1,
            trilogy: 1,
          },
          contentWordFreq: {
            dinosaurs: 2,
            a: 1,
            story: 1,
            about: 1,
          },
        });
      });
  });
});
