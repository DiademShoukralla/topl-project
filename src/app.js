const express = require("express");
const app = express();

const morgan = require("morgan");
app.use(morgan("dev"));

const retrieveArticles = require("./articles");
const {
  validNumParam,
  parseKeywordsParam,
  validCategoryParam,
} = require("./middleware");

app.get(
  "/api/articles",
  validNumParam,
  parseKeywordsParam,
  validCategoryParam,
  async (req, res, next) => {
    let { num, keywords, category } = req.query;
    let articles;
    try {
      articles = await retrieveArticles({ num, keywords, category });
    } catch (err) {
      res.status(500);
      return next(new Error("Unable to retrieve articles"));
    }
    res.send({ success: true, articles: articles });
  }
);

app.use((err, req, res, next) => {
  console.log(err);
  res.send({ error: err.message });
});

module.exports = app;
