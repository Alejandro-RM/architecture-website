const Express = require('express');
const HTTPError = require('http-errors');
const ErrorsRouter = Express.Router();

// Handle HTTP 404 errors
ErrorsRouter.use((request, response, next) => {
	next(HTTPError(404, `No podemos encontrar: ${request.originalUrl}.`))
});

// Error handler
ErrorsRouter.use((error, request, response, next) => {
	response.locals.error = {
		status: error.status || 500,
		message: error.expose ? error.message : '¡Ups! ¡Algo falló gravemente!',
		please_report: 'Por favor reporta este error al administrador.'
	};

	response.status(error.status || 500);
	response.render('error', {
		script_name: 'error'
	});
});

module.exports = ErrorsRouter;1