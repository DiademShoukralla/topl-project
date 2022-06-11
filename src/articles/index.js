const { Article } = require("./article");
const NewsDataApi = require("./newsdata");

/**
 * Fetch articles from an External API
 *
 * @param {*} queryObj Object containing information to query on
 * @return {Article[]}
 */
const fetchArticles = (queryObj, source) => {
  if (source === "NewsData") {
    return NewsDataApi.fetchArticles(queryObj);
  }
  return [];
};

/**
 * Retrieve articles based on a query
 *
 * @param {*} queryObj Object containing information to return articles on
 * @param {string} source Denotes which article source we will use if
 * fetching from an external api is needed.
 */
const retrieveArticles = (queryObj, source = "NewsData") => {
  let articles;
  // If in the cache
  if (false) {
    articles = []; // Replace with cache fetch
  } else {
    articles = fetchArticles(queryObj, source);
    // cache.put(articles) => After processed
  }
  return articles.map((article) => article.toJSON());
};
