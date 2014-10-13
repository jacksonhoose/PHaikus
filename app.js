'use strict';

var koa = require('koa'),
	mount = require('koa-mount'),
	logger = require('koa-logger'),
	views = require('koa-views'),
	app = koa();

var haiku = require('./routers/haiku'),
	author = require('./routers/author');

/* logging */
app.use(logger());

/* templating */
app.use(views('views', {
	default: 'jade',
	cache: true
}));

/* mount routes */
app.use(mount('/haiku', haiku.middleware()));
app.use(mount('/author', author.middleware()));

app.listen(3000);
