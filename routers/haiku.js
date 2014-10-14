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
	var res = yield haikus.findOne({ titleSlug:  this.params.title });
	// this.body = yield haikus.findOne({ titleSlug:  this.params.title });

	yield this.render('show', {
		haiku: res
	});
}

function *create() {

}

module.exports = api;