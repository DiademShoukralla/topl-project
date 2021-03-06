const { Article } = require("./article");
const NewsDataApi = require("./newsdata");
const cache = require("../cache");

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
  // Caching based on source, keywords, category and page number
  const cacheKey = `${source}_${keywords}_${category}_${page}`;
  let pageArticles = cache.get(cacheKey);
  if (!pageArticles) {
    pageArticles = await fetchArticles({ keywords, category, page }, source);
    cache.set(cacheKey, pageArticles);
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
  let articles = await Promise.all(
    fullPages.map((page) =>
      fetchExternalOrCache({ keywords, category, page }, source)
    )
  ).then((allPages) => allPages.flat());

  if (numExtraPage > 0) {
    const lastPage = (fullPages[fullPages.length - 1] || 0) + 1;
    let pageArticles = await fetchExternalOrCache(
      { keywords, category, page: lastPage },
      source
    );
    articles.push(...pageArticles.slice(0, numExtraPage));
  }
  return articles.map((article) => article.toJSON());
};

module.exports = retrieveArticles;
