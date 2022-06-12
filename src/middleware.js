let validNumParam = (req, res, next) => {
  // Force type to a Number if provided, if not provided use default
  req.query.num = req.query.num ? Number(req.query.num) : 10;
  // Verify it is a valid number
  if (!isNaN(req.query.num)) return next();
  res.status(400);
  return next(new Error("num parameter is expected to be a number"));
};

exports.validNumParam = validNumParam;

let parseKeywordsParam = (req, res, next) => {
  if (req.query.keywords)
    req.query.keywords = encodeURIComponent(req.query.keywords);
  next();
};

exports.parseKeywordsParam = parseKeywordsParam;

let validCategoryParam = (req, res, next) => {
  let validValues = [
    "business",
    "entertainment",
    "environment",
    "food",
    "health",
    "politics",
    "science",
    "sports",
    "technology",
    "top",
    "world",
  ];
  // If category was not provided (optional) or it was valid, continue
  if (!req.query.category || validValues.includes(req.query.category))
    return next();

  res.status(400);
  return next(new Error("category parameter is invalid"));
};

exports.validCategoryParam = validCategoryParam;
