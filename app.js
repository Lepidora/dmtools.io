
/**
 * Module dependencies.
 */

var express = require('express')
  , favicon = require('serve-favicon')
  , bodyParser = require('body-parser')
  , morgan = require('morgan')
  , methodOverride = require('method-override')
  , errorHandler = require('errorhandler')
  , routes = require('./routes.js')
  , http = require('http')
  , path = require('path')
  , sass = require('node-sass-middleware');

var app = express();

app.engine('pug', require('pug').__express);

app.use(sass({
	src: __dirname,
	dest: path.join(__dirname, 'public/'),
	debug: true,
	outputStyle: 'compressed'
}));

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
//app.use(express.favicon());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(express.methodOverride());
//app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' === app.get('env')) {
  app.use(errorHandler());
}

routes(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Server listening on port ' + app.get('port'));
});
