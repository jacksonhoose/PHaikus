var router = require('koa-router'),
	monk = require('monk'), 
	wrap = require('co-monk'), 
	db = monk('localhost/PoopHaikus'), 
	haikus = wrap(db.get('Haikus')),
	api = new router();

api.get('/', list);
api.post('/', create);
api.get('/:title', show);

function *list() {
	var res = yield haikus.find({});

	yield this.render('list', { 
		haikus: res
	});
}

function *show(title) {
	var res = yield haikus.findOne({ titleSlug: title  });
	
	yield this.render('home', {
		title: res.title,
		body: res.body
	});
}

function *create() {

}

module.exports = api;