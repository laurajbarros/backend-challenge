const redis = require('redis');
const cache = redis.createClient();
const functions = require('./functions.js');

cache.on('connect', () => {
  console.log('REDIS READY');
});

cache.on('error', (e) => {
  console.log('REDIS ERROR', e);
});

saveInCache = (extendedMenu) => {
  cache.set('menu', JSON.stringify(extendedMenu), 'EX', 86400, function(err, result) {
    if (err !== null) {
      return 'err';
    }
  });
},

fetchAndSaveInCache = (req, res) => {
  functions.reachThirdParty(req, res)
      .then((extendedMenu) => {
        saveInCache(extendedMenu);
        res.send(extendedMenu);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
};

// callback solution
// functions.reachThirdParty(req, res, (extendedMenu) => {
//   if (extendedMenu === 'err') {
//     res.send('err');
//   } else {
//   }
// });

fetchFromCache = (req, res) => {
  cache.get('menu', function(err, reply) {
    res.send(reply);
  });
};

module.exports = {
  returnMenu: function(req, res) {
    cache.get('menu', function(err, reply) {
      if (reply === null) {
        fetchAndSaveInCache(req, res);
      } else {
        fetchFromCache(req, res);
      }
    });
  },
};
