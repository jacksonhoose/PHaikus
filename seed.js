var monk = require('monk'), 
	wrap = require('co-monk'), 
	db = monk('localhost/PoopHaikus'), 
	haikus = wrap(db.get('Haikus')),
	faker = require('faker'),
	moment = require('moment'),
	slug = require('slug');

haikus.drop();

var title, author;

for (var i = 1000; i >= 0; i--) {
	author = faker.name.findName();
	title = faker.lorem.words().join(' '); 

	haikus.insert({
		title: title,
		titleSlug: slug(title),
		body: faker.lorem.sentences(),
		author: author,
		authorSlug: slug(author),
		createdAt: moment().format(),
		updatedAt: moment().format()
	});
}

db.close();