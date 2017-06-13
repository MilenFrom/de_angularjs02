"use strict"

const config = {
	title: 'My Blog',
	logo: '/images/logo.png'
};

console.log(config.title);
console.log(config.logo);

delete config.title;

console.log(config);

config.url = 'http://w3b.club';

console.log(config);

config = {
	title: 'My Blog',
	logo: '/images/logo.png'
};

console.log(config);