const express = require('express');
const people_and_builders_router = express.Router();

// Deliver /
people_and_builders_router.get('/', (request, response, next) => {
	response.render('biographies', {
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

module.exports = people_and_builders_router;