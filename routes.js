/*
 * Routing for pages
 */

const path = require('path');

const index = require('./routes/index')
  , generators = require('./routes/generators');

const shop = require('./controllers/shop.js');

module.exports = function(app) {
	
	app.get('/', index.render);
	app.get('/town', generators.town);
	app.get('/shop', generators.shop);
	app.get('/token', generators.token);
	
	app.post('/shop', shop.generateShop);
};