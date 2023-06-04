const express = require('express');
const home_router = express.Router();

// Redirect GET / to /home
home_router.get('/', (request, response, next) => response.redirect('/home'));

// Deliver /home
home_router.get('/home', (request, response, next) => {
	response.render('home', {
		website_title: request.app.get('website-title'),
		navigation_bar: request.app.get('website-navbar'),
		page_title: request.app.get('website-title'),
		theme: request.session.theme ? request.session.theme : request.app.get('website-default-theme'),
		language: request.app.get('website-default-language'),
		user: !request.user ? {
			role: 'guest'
		} : request.user
	});
});

module.exports = home_router;