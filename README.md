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

I opted not to use GNews for this project since the returned articles do not include the articles' authors. Furthermore, I considered 3 different APIs to use: [GNews](https://gnews.io/), [NewsData](https://newsdata.io/), and [NewsAPI](https://newsapi.org/). I considered the data returned for each as well as the rate limits of each free plan.

I chose to implimented this server with the NewsData API.
Please note that since I'm using the free plan, there is a request limit. NewsData allows 10 articles per request, up to 200 times per day.

### To run the API server

Prior to running, you must copy .env.template to .env and supply API Keys for the news source. Please reach out if you require mine.

```
> npm i
> npm run start
```

### To run the tests

```
> npm i
> npm run test
```

## API Query Parameters

Endpoint: `GET /api/articles`
| Field | Type | Default | Description |
|---------------------|--------|---------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| num (optional) | number | 10 | Number of articles to return. This is a maximum (in case the specified number of articles that satisfy the query doesn't exist). For example `&num=25` |
| keywords (optional) | string | n/a | URL Encoded keyword/phrase that must be present in the articles. For example `&keywords=pumpkin%20pie` |
| category (optional) | string | n/a | Category the articles must belong to. For the currently implemented news source, the valid values are: business, entertainment, environment, food, health, politics, science, sports, technology, top,world. For example `&category=food` |

## Example Response

Successful Response

```
{
    "success": true,
    "articles": [
        {
            "title": "article title",
            "url": "link to the article",
            "imgUrl: "link to the article's image",
            "source": "article's source",
            "keywords": [],   // List of keywords
            "authors": [],    // List of authors
            "pubDate": "publication date",
            "description": "description of the article (if available)",
            "content": "content of the article (if available)",
            "metadata": {
                "contentWordFreq": {   // Word frequency map of the article content
                    ...
                },
                "descWordFreq": {    // Word frequency map of the article description
                    ...
                }
            }
        },
        ...
    ]
}
Status: 200
```

Unsuccessful Response

```
{
    "error": "Error message"
}
Status: 400 or 500
```

**Note:**

Instead of searching for articles with a specific author I decided to search for articles with a specific category instead. The reasoning is because of all the public news APIs that I considered (Gnews, NewsData, and NewsAPI), none of them had the capabilities to search by author. I thought about implementing search by author despite this restriction, and considered either only returning articles of that author that was already cached/saved in the backend, or repeatedly calling the External API and filtering by the author after the fact, but I was not happy with either solution. Both methods would return an incomplete list (former would only return articles we have seen before, latter has no guarantee `num` articles from the author would be returned even if it does exist on the external API server). Additionally, if I opted to use the latter strategy, it would most definitely be a waste of expensive external calls and would probably run out of free credits in a single call (yikes!).

**tldr;** I know the prompt listed "finding news articles with a specific author", but I chose to find news articles with specific category instead.

**Approx Hours Spent (multiple sittings):** 5
