'use strict';

var koa = require('koa'),
	mount = require('koa-mount'),
	logger = require('koa-logger'),
	views = require('koa-views'),
	json = require('koa-json'),
	serve = require('koa-static'),
	gzip = require('koa-gzip'),
	etag = require('koa-etag'),
	// wan = require('wan/koa'),
	// userauth = require('koa-userauth'),
	// session = require('koa-generic-session'),
	app = koa();

var haiku = require('./routers/haiku'),
	author = require('./routers/author');

/* logging */
app.use(logger());

// app.use(session());

app.use(gzip());
app.use(etag());
// app.use(wan({ location: './assets/img/dest' }));

/* static files */
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
