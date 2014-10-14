'use strict';

var koa = require('koa'),
	mount = require('koa-mount'),
	logger = require('koa-logger'),
	views = require('koa-views'),
	json = require('koa-json'),
	serve = require('koa-static'),
	app = koa();

var haiku = require('./routers/haiku'),
	author = require('./routers/author');

/* logging */
app.use(logger());

/*!
 * static files
 */
app.use(serve('./assets/js'));
app.use(serve('./assets/img/dest'));
app.use(serve('./assets/css'));

/* app.use(json({ pretty: false, param: 'pretty' })); */

/* templating */
app.use(views('views', {
	default: 'jade',
	cache: true
}));

/* mount routes */
app.use(mount('/haiku', haiku.middleware()));
app.use(mount('/author', author.middleware()));

app.listen(3000);
