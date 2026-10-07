const NodeCache = require('node-cache');

// Standard TTL of 60 seconds, checkperiod 120 seconds
const cache = new NodeCache({ stdTTL: 60, checkperiod: 120 });

let hitCount = 0;
let missCount = 0;

module.exports = {
  get: (key) => {
    const data = cache.get(key);
    if (data !== undefined) {
      hitCount++;
      return data;
    }
    missCount++;
    return null;
  },
  set: (key, val, ttl) => {
    if (ttl) {
      return cache.set(key, val, ttl);
    }
    return cache.set(key, val);
  },
  del: (key) => {
    return cache.del(key);
  },
  flush: () => {
    return cache.flushAll();
  },
  getStats: () => {
    return {
      hits: hitCount,
      misses: missCount,
      totalRequests: hitCount + missCount,
      hitRatio: hitCount + missCount > 0 ? ((hitCount / (hitCount + missCount)) * 100).toFixed(2) + '%' : '0%',
      cachedKeys: cache.keys(),
      nodeCacheStats: cache.getStats()
    };
  }
};
