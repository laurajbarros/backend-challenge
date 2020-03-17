const express = require('express');
const app = express();
const cache = require('./cache.js');

app.get('/menu', function(req, res) {
  cache.returnMenu(req, res);
});

if (!module.parent) {
  app.listen(3000);
  console.log('PepperHQ API has started');
}
