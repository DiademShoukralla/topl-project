/**
 * Mock Implementation for NewsData Api for testing
 *
 * Will contain 12 articles (i.e, 1 full page and 1 partial page)
 */

const { Article, Metadata } = require("../article");

class MockArticle extends Article {
  processArticle({ title, category, content, description }) {
    this.title = title;
    this.url = "";
    this.imgUrl = "";
    this.source = "";
    this.authors = [];
    this.pubDate = "";
    this.categories = category || [];
    this.description = description || "";
    this.content = content || "";
  }
}

class MockMetadata extends Metadata {
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

const article1 = {
  title: "article1",
  content: "A story about dinosaurs. Dinosaurs!",
};
const article2 = {
  title: "article2",
  category: ["science"],
};
const article3 = {
  title: "article3",
};
const article4 = {
  title: "article4",
  description: "More Dinosaurs",
  category: ["science", "tech"],
};
const article5 = {
  title: "article5",
  category: ["science", "tech"],
};
const article6 = {
  title: "article6",
};
const article7 = {
  title: "article7",
};
const article8 = {
  title: "article8",
  category: ["food"],
};
const article9 = {
  title: "article9",
};
const article10 = {
  title: "article10",
};
const article11 = {
  title: "article11",
};
const article12 = {
  title: "article12",
};

const articles = [
  article1,
  article2,
  article3,
  article4,
  article5,
  article6,
  article7,
  article8,
  article9,
  article10,
  article11,
  article12,
];

const keywordArticles = {
  dinosaurs: [article1, article4],
};

const categoryArticles = {
  food: [article8],
  science: [article2, article4, article5],
  tech: [article5],
};

const fetchArticles = ({ page, keywords, category }) => {
  if (keywords && category) {
    let kArticles = keywordArticles[keywords] || [];
    let cArticles = categoryArticles[category] || [];
    let intersection = [];
    // The following is bad runtime algorithm,
    // but since kArticles is at most 2, and
    // cArticles is at most 3, runtime is trivial
    kArticles.forEach((a) => {
      if (cArticles.includes(a)) intersection.push(a);
    });
    // Since hard coded, will never be more than a page
    return intersection;
  }
  // Since hard coded, will never be more than a page
  if (keywords) return keywordArticles[keywords] || [];
  if (category) return categoryArticles[category] || [];
  // Query with no keywords or category will be over a page.
  const pageStart = (page - 1) * 10;
  return articles.slice(pageStart, pageStart + 10);
};

module.exports = {
  fetchArticles,
};
