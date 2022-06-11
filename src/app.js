const express = require("express");
const app = express();

const morgan = require("morgan");
app.use(morgan("dev"));

app.use((err, req, res, next) => {
  res.send({ error: err.message });
});

module.exports = app;
