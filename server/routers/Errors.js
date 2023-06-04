const Express = require('express');
const HTTPError = require('http-errors');
const ErrorsRouter = Express.Router();

// Error notifier
ErrorsRouter.get('/data', (request, response, next) => {
    const messages = request.session.messages;
    request.session.messages = [];
    response.json(messages);
});

// Handle HTTP errors
ErrorsRouter.use('/401', (request, response, next) => { // 401
	next(HTTPError(401, `No tiene permiso para acceder.`));
});

ErrorsRouter.use((request, response, next) => { // 404
	next(HTTPError(404, `No podemos encontrar: ${request.originalUrl}.`));
});

// Error handler
ErrorsRouter.use((error, request, response, next) => {
	request.session.error = {
		status: error.status || 500,
		message: error.expose ? error.message : '¡Ups! ¡Algo falló gravemente!',
		please_report: 'Por favor reporta este error al administrador.'
	};
    
    if(request.session.messages)
        request.session.messages.push(`${request.session.error.status} <> ${request.session.error.message}`);
    else
        request.session.messages = [`${request.session.error.status} <> ${request.session.error.message}`];

	response.status(error.status || 500);
	response.redirect('/errors/error.html');
});

module.exports = ErrorsRouter;