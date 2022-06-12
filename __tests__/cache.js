/**
 * Test suite for testing the cache implimentation
 */
const cache = require("../src/cache");

describe("Verifying Cache", () => {
  it("Verify fetching with a key that doesnt exist yet => undefined", () => {
    let item = cache.get("random_key");
    expect(item).toEqual(undefined);
  });
  it("Verify fetching with a key that does exist => returns the value", () => {
    let key = "Source_keywords_category_page1";
    let value = ["article1", "article2", "article3"];
    cache.set(key, value);
    expect(cache.get(key)).toEqual(value);
  });
  it("Verify fetching with a key that expired has been deleted => undefined", (done) => {
    let key = "Source_keywords_category_page2";
    let value = ["article4", "article5"];
    cache.set(key, value);
    setTimeout(() => {
      expect(cache.get(key)).toEqual(undefined);
      done();
    }, 1111); // just over a second to ensure expiry
  });
});
