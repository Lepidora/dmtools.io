
/*
 * GET home page.
 */

const generator = require('../controllers/character.js');

exports.render = function(req, res){
	
	let stats = generator.getBaseCommonerStats();
	
	console.log(stats);
    res.render('index', { title: 'Express', stats: stats });
};