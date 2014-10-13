var router = require('koa-router'),
	monk = require('monk'), 
	wrap = require('co-monk'), 
	db = monk('localhost/PoopHaikus'), 
	haikus = wrap(db.get('Haikus')),
	api = new router();

api.get('/:author', list);
api.get('/:author', list);

function *list(author) {
	var res = yield haikus.find({ authorSlug: this.params.author });

	yield this.render('list', { 
		haikus: res
	});
}

module.exports = api;