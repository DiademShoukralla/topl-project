const { Article } = require("./article");
const NewsDataApi = require("./newsdata");

const PAGE_SIZE = 10;

/**
 * Fetch articles from an External API
 *
 * @param {{
 *  keywords: string|undefined;
 *  category: string|undefined;
 *  page: number;
 * }} queryObj query info to search on such as keywords or pagination offset
 * @return {Article[]}
 */
const fetchArticles = (queryObj, source) => {
  if (source === "NewsData") {
    return NewsDataApi.fetchArticles(queryObj);
  }
  return [];
};

/**
 * Retrieve a page of articles from cache (if exist) or extrernal API
 *
 * @param {{
 *  keywords: string|undefined;
 *  category: string|undefined;
 *  page: number;
 * }} queryObj query info to search on such as keywords or pagination offset
 * @return {Article[]}
 */
const fetchExternalOrCache = async ({ keywords, category, page }, source) => {
  let pageArticles;
  // If in the cache (TODO)
  if (false) {
    pageArticles = []; // Replace with cache fetch
  } else {
    pageArticles = await fetchArticles({ keywords, category, page }, source);
    // cache.put(...)
  }
  return pageArticles;
};

/**
 * Retrieve articles based on a query
 *
 * @param {{
 *  num: number;
 *  keywords: string|undefined;
 *  category: string|undefined;
 * }} queryObj query information which dictates which articles are returned
 * @param {string} source Denotes which article source we will use if
 * fetching from an external api is needed.
 * @returns {object} list JSON objects containing the articles
 */
const retrieveArticles = async (
  { num, keywords, category },
  source = "NewsData"
) => {
  const numFullPages = Math.floor(num / PAGE_SIZE);
  const fullPages = Array.from(Array(numFullPages).keys()).map((i) => i + 1); // 1...N
  const numExtraPage = num % PAGE_SIZE;
  let articles = [];
  fullPages.forEach((page) => {
    articles.push(
      ...fetchExternalOrCache({ keywords, category, page }, source)
    );
  });

  if (numExtraPage > 0) {
    const lastPage = fullPages[fullPages.length - 1] + 1;
    const pageArticles = fetchExternalOrCache(
      { keywords, category, page: lastPage },
      source
    );
    articles.push(...pageArticles.slice(0, numExtraPage));
  }

  return articles.map((article) => article.toJSON());
};

module.exports = retrieveArticles;
