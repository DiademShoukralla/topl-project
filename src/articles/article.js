class Article {
  title;
  url;
  imgUrl;
  source;
  authors;
  categories;
  pubDate;
  description;
  content;
  metadata;
  constructor(article, metadata) {
    this.metadata = metadata;
    this.processArticle(article);
  }

  processArticle(article) {
    // Article fields/entries may be different in different news sources
    throw new Error("To be implemented in subclass");
  }

  toJSON() {
    return {
      title: this.title,
      url: this.url,
      imgUrl: this.imgUrl,
      source: this.source,
      authors: this.authors,
      categories: this.categories,
      pubDate: this.pubDate,
      description: this.description,
      content: this.content,
      metadata: this.metadata.toJSON(),
    };
  }
}

exports.Article = Article;

class Metadata {
  contentWordFreq;
  descWordFreq;
  constructor(article) {
    this.contentWordFreq = {};
    this.descWordFreq = {};
    this.analyzeArticle(article);
  }

  /**
   * Analyze additional information about the article
   *
   * Currently only finding word frequencies in the content and description
   * but could be extended to find more.
   */
  analyzeArticle(article) {
    // Article fields/entries may be different in different news sources
    throw new Error("To be implemented in subclass");
  }

  /**
   * *Helper method*
   * Given a body of text,
   * return the text as an array of lowercase words
   *
   * Prior to analysis,
   * - Force all characters to lowercase
   * - Trim whitespace at the ends
   * - Remove any punctuation that is not apart of a word
   * - Remove any repeating spaces
   *
   * @param {string} text text to parse
   * @return {string[]} array containing the normalized words in the text
   */
  getWordArray(text) {
    if (!text || text.trim() === "") return [];
    return text
      .toLowerCase()
      .trim()
      .replace(/[^(\w|'-\s)]/g, "")
      .replace(/\s{2,}/g, " ")
      .split(" ");
  }

  toJSON() {
    return {
      contentWordFreq: this.contentWordFreq,
      descWordFreq: this.descWordFreq,
    };
  }
}

exports.Metadata = Metadata;
