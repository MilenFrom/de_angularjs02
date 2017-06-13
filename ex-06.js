"use strict"

function createUser(user, plan = 'free'){

	if(typeof user !== 'string' || user.trim().length === 0){
		throw 'Not defined or empty user name';
	}

	console.log(`Create User ${user} [${plan}]`);
}

createUser('','');
createUser('Fake User','Faker');

createUser('FakeUser');

createUser('Neue User',' ');

createUser(' ',' ');