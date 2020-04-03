const handlebars = require('handlebars');
const helpers = require('handlebars-helpers');
helpers.math({ handlebars });

function mergeItems(template, items) {   //equal to mergeCategories but instead of passing <li> we will pass td and tr
  const render = handlebars.compile(template);
return render({ items });
}

exports.mergeItems = mergeItems;
