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
      if(submenu.product == null){
        return "err"
      }
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
  const time = 86400;
  cache.set(menukey, menu, timeInSecond, time,function(err,result){
    if(err !== null){
      return "err"
    }
  });
  }
}

module.exports = functions;
