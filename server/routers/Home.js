const Express = require('express');
const HomeRouter = Express.Router();

// Redirect GET / to /home
HomeRouter.get('/', (request, response, next) => response.redirect('/home.html'));

module.exports = HomeRouter;