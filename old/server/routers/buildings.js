const express = require('express');
const async_handler = require('express-async-handler');
const Building = require('../models/building');
const buildings_router = express.Router();

// Deliver /
buildings_router.get('/', (request, response, next) => {
	response.render('buildings', {
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

// Deliver /
buildings_router.get('/data', async_handler(async (request, response, next) => {
	if(request.query.start && request.query.start) {
		let first = parseInt(request.query.start);
		let size = parseInt(request.query.end) - parseInt(request.query.start);
		if(first + size > await Building.estimatedDocumentCount())
			size -= (first + size) - await Building.estimatedDocumentCount();

        const buildings = await Building.
            find({}, 'name brief_description images_paths').
			skip(first).
			limit(size).
			exec();
        response.json(buildings);
    }
}));

module.exports = buildings_router;