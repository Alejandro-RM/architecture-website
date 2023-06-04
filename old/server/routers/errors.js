const express = require('express');
const http_error = require('http-errors');

const errors_router = express.Router();

// Handle HTTP 404 errors
errors_router.use((request, response, next) => {
	next(http_error(404, `No podemos encontrar: ${request.originalUrl}.`))
});

// Error handler
errors_router.use((error, request, response, next) => {
	response.locals.error_status = error.status;
	response.locals.error_message = error.expose ?
		error.message :
		'¡Ups! ¡Algo falló gravemente!';
	response.locals.error = request.app.get('env') === 'development' ?
		error :
		'Por favor reporta este error al administrador.';

	// Render the error page
	response.status(error.status || 500);
	response.render('error', {
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

module.exports = errors_router;