const Express = require('express');
const HomeRouter = Express.Router();

// Redirect GET / to /home
HomeRouter.get('/', (request, response, next) => response.redirect('/home'));

HomeRouter.get('/home', (request, response, next) => {
    response.render('base', {
		script_name: 'home'
	});
});

module.exports = HomeRouter;