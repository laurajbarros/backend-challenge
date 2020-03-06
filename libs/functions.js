var cache = require("../cache.js");


var functions = {
  transformTitleToHash: function(titles){
                          let obj = {};
                          titles.forEach(function(item,i){
                            obj[item.id] = item.title;
                          })
                          return obj
                        },
  createExtendedMenu: function(menu,dictionary){

                          menu.forEach(function(submenu, i, menu){
                            submenu.products.forEach(function(product, j, submenu){
                              product["title"] = dictionary[product.id];
                            })
                          })
                          return menu
                        },
  saveInCache: function(extendedMenu){
                const menukey = "menu";
                const menu = JSON.stringify(extendedMenu);
                const timeInSecond = 'EX';
                const time = 10;
                cache.set(menukey, menu, timeInSecond, time);
                cache.get("menu", function(err, reply) {
                })
              }
}

module.exports = functions;
