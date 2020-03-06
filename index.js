var express = require('express');
var app = express();
var axios = require('axios');
var functions = require("./libs/functions.js");
const titles = require('./titles.json');
var cache = require("./cache.js");

var dictionary = functions.transformTitleToHash(titles);

app.get('/', function(req, res){
  res.send('Hello World');
});

app.get('/menu', function(req, res){
  cache.get("menu", function(err, reply) {
    if(reply == null){
      // get menu from service provider api
      axios.get('http://backend-challenge-pos.pepperhq.com/menu.json')
        .then(response => {
          // create extendedMenu
          let menu = response.data.categories;
          let extendedMenu = functions.createExtendedMenu(menu,dictionary);
          // saves in Cache
          functions.saveInCache(extendedMenu);
          res.send(extendedMenu);
        })
        .catch(error => {
          res.send(error)
        });
    } else {
      // loads extendedMenu from cache
      cache.get("menu", function(err, reply) {
        res.send(reply);
      })
    }
  });
});

if (!module.parent) {
  app.listen(3000);
  console.log('PepperHQ API has started');
}
