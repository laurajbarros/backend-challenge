var express = require('express');
var app = express();
var axios = require('axios');
var functions = require("./libs/functions.js");
const titles = require('./titles.json');
var cache = require("./cache.js");

app.get('/menu', function(req, res){
  cache.get("menu", function(err, reply) {
    if(reply === null){
      // gets menu from service provider api
      axios.get('http://backend-challenge-pos.pepperhq.com/menu.json')
        .then(response => {
          // creates extended menu
          var dictionary = functions.transformTitleToHash(titles);
          var menu = response.data.categories;
          var extendedMenu = functions.createExtendedMenu(menu,dictionary);
          // deals with submenu non existant or data error
          if(menu == null || extendedMenu === "err"){
            res.status(400).send({
              message: 'Error in menu data'
            });
          }
          // saves in cache
          functions.saveInCache(extendedMenu);
          res.send(extendedMenu);
        })
        .catch(error => {
          res.status(400).send({
            message: 'It was not possible to fetch menu'
          });
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
