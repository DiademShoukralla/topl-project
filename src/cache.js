const NodeCache = require("node-cache");

// Posts remain in cache for 10 minutes (1 second for testing purposes).
// Will automatically delete on expiry

let stdTTL = process.env.NODE_ENV === "test" ? 1 : 600;
let checkperiod = process.env.NODE_ENV === "test" ? 1 : 600;

const cache = new NodeCache({ stdTTL, checkperiod });

module.exports = cache;
