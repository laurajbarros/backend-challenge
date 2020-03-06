const redis = require('redis');
const cache = redis.createClient();

cache.on('connect', () => {
 console.log('REDIS READY');
});

cache.on('error', (e) => {
 console.log('REDIS ERROR', e);
});

module.exports = cache;
