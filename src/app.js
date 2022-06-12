const express = require("express");
const app = express();

const morgan = require("morgan");
app.use(morgan("dev"));

const retrieveArticles = require("./articles");

app.get("/api/articles", async (req, res, next) => {
  let articles;
  try {
    articles = await retrieveArticles();
  } catch (err) {
    console.log(err);
    res.status(500);
    return next(new Error("Unable to retrieve articles"));
  }
  res.send({ success: true, articles: articles });
});

app.use((err, req, res, next) => {
  res.send({ error: err.message });
});

module.exports = app;
