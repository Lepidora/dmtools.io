
/*
 * GET users listing.
 */

const character = require('../controllers/character');
const shop = require('../controllers/shop');

exports.town = function(req, res) {
    res.render('generator', { title: 'Town Generator'});
};

exports.shop = function(req, res) {
    res.render('generators/shop', { title: 'Shop Generator', types: shop.getShops() });
};

exports.token = function(req, res) {
    res.render('generators/token', { title: 'Token Creator' });
}