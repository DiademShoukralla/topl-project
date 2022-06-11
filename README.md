# Topl's Interview Project

## Prompt

### Project instructions

Your task is to create a simple API that interacts with a public news API for fetching articles. For the back-end, you can use the language and framework of your choice. For example, you can use the GNews API and then create your own API service, with documentation, that interacts with this API for fetching articles. A functional coding style is suggested.

Your API should have a few basic functions like, fetching N news articles, finding news articles with a specific author, and searching by keywords. Include a cache in your API service as well so users are not fetching the same things over and over.

The article sources should be abstracted so that the api can easily be extended to work with multiple article sources.

The returned articles should include some metadata that tells us about the article. The metadata should also include some analysis of the article such as a word frequency map.

You may write your solution in any of these languages: Scala, JavaScript, Python, Dart.

### How to submit

Upload your completed project to a public GitHub repository, and then send a link to the repository to [ redacted ] along with any comments you have about your solution. Please include instructions on how to run the application in your README.md.

## Notes

Note that I ran and tested this using npm version 8.3.1 and node version v14.18.0

### To run the API server

Prior to running, you must copy .env.template to .env and supply API Keys for the news sources. Please reach out if you require mine.

I opted not to use GNews for this project since the returned articles do not include the articles' authors.
Instead I implimented this server with the [NewsData](https://newsdata.io/) API.
Please note that since I'm using the free plan, there is a request limit. NewsData allows 10 articles per request, up to 200 times per day.

```
> npm i
> npm run start
```

### To run the tests

```
> npm i
> npm run test
```

## About the API

### Endpoint

`/api/articles`

Hours spent: 3
