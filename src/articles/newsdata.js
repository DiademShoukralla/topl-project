const axios = require("axios").default;
const { Article, Metadata } = require("./article");

class NewsDataArticle extends Article {
  processArticle(article) {
    // save specific fields of the article as members of this class
    this.title = article.title || null;
    this.url = article.link || null;
    this.imgUrl = article.image_url || null;
    this.source = article.source_id || null;
    this.keywords = article.keywords || [];
    this.authors = article.creator || [];
    this.pubDate = article.pubDate || null;
    this.description = article.description || "";
    this.content = article.content || "";
  }
}

class NewsDataMetadata extends Metadata {
  analyzeArticle(article) {
    let { content, description } = article;
    content = this.getWordArray(content);
    content.forEach((word) => {
      if (!this.contentWordFreq[word]) this.contentWordFreq[word] = 0;
      this.contentWordFreq[word]++;
    });
    description = this.getWordArray(description);
    description.forEach((word) => {
      if (!this.descWordFreq[word]) this.descWordFreq[word] = 0;
      this.descWordFreq[word]++;
    });
  }
}

/**
 * Logic for fetching articles from the NewsData API.
 */
const API_KEY = process.env.NEWSDATA_KEY;
const API_URL = "https://newsdata.io/api/1/news";

// For simplicity, will only fetch english articles
const lang = "en";

/**
 *
 * @param {{
 *  query: string|undefined;
 *  page: number;
 * }} queryObj query info to search on such as keywords or pagination offset
 * @returns {NewsDataArticle[]} Articles already processed
 */
const fetchArticles = (queryObj) => {
  let { page, query } = queryObj;
  let searchQuery = query ? `&q=${encodeURIComponent(query)}` : "";
  let requestUrl = `${API_URL}?apiKey=${API_KEY}&language=${lang}&page=${page}${searchQuery}`;
  return axios
    .get(requestUrl)
    .then(({ data: { status, results } }) => {
      if (status !== "success")
        return Promise.reject(`Status from NewsData API call was ${status}`);
      if (!results)
        return Promise.reject(
          "Response from NewsData API call not as expected"
        );
      return results;
    })
    .then((articles) =>
      articles.map((article) => {
        let metadata = new NewsDataMetadata(article);
        return new NewsDataArticle(article, metadata);
      })
    );
};

module.exports = {
  fetchArticles,
};
