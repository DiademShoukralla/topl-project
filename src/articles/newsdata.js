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
// For simplicity sake, we will only fetch articles in English
const lang = "en";

/**
 *
 * @param {*} queryObj Object containing information to query on
 * @returns {NewsDataArticle[]} Articles already processed
 */
const fetchArticles = (queryObj) => {};

module.exports = fetchArticles;
