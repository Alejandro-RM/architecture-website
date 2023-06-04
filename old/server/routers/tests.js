const express = require('express');
const tests_router = express.Router();

// Deliver /
tests_router.get('/', (request, response, next) => {
	response.render('tests', {
		website_title: request.app.get('website-title'),
		navigation_bar: request.app.get('website-navbar'),
		page_title: 'Tests',
		theme: request.session.theme ? request.session.theme : request.app.get('website-default-theme'),
		language: request.app.get('website-default-language'),
		user: !request.user ? {
			role: 'guest'
		} : request.user
	});
});

module.exports = tests_router;