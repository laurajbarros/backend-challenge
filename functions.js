const axios = require('axios');
const titles = require('./titles.json');

const titlesToHash = function(titles) {
  const obj = {};
  titles.forEach(function(item, i) {
    obj[item.id] = item.title;
  });
  return obj;
};

const createExtendedMenu = function(menu, dictionary) {
  menu.forEach(function(submenu, i, menu) {
    submenu.products.forEach(function(product, j, submenu) {
      product['title'] = dictionary[product.id];
    });
  });
  return menu;
};

module.exports = {
  reachThirdParty: function(req, res, callback) {
    axios.get('http://backend-challenge-pos.pepperhq.com/menu.json')
        .then((response) => {
          const extendedMenu = createExtendedMenu(response.data.categories, titlesToHash(titles));
          callback(extendedMenu);
        })
        .catch((error) => {
          callback('err');
        });
  },
};
