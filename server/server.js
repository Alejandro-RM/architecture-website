const HTTP = require('http');
const Path = require('path');
const Express = require('express');
const MongoStore = require('connect-mongo');
const Mongoose = require('mongoose');
const Passport = require('passport');
const Session = require('express-session');

const ErrorsRouter = require('./routers/Errors');
const HomeRouter = require('./routers/Home');
const SessionsRouter = require('./routers/Sessions');

// Create the express application
const application = Express();
const port = process.env.SERVER_PORT || '3000';

// Setup application
application.set('x-powered-by', false);
application.set('website-port', port);
application.set('client-path', Path.join(__dirname, '..', 'client'));

// Configure parsing of response bodies
application.use(Express.json());
application.use(Express.urlencoded({
	extended: true
}));

// Connect to MongoDB
Mongoose.set('strictQuery', false);
Mongoose.connect(process.env.SERVER_MONGODB_URI);

// Configure sessions
application.use(Session({
	secret: process.env.SERVER_SESSION_SECRET,
	store: MongoStore.create({
		client: Mongoose.connection.getClient(),
		crypto: {
			secret: process.env.SERVER_SESSION_SECRET
		}
	}),
	resave: false,
	saveUninitialized: false
}));
application.use(Passport.authenticate('session'));

// Configure static files serving
application.use('/restricted', (request, response, next) => {
    if(!request.user || request.user.role != 'administrator')
        response.redirect('/errors/401');
    else
        next();
});

application.use(Express.static(Path.join(__dirname, '..', 'client', 'css')));
application.use(Express.static(Path.join(__dirname, '..', 'client', 'html')));
application.use(Express.static(Path.join(__dirname, '..', 'client', 'js')));
application.use(Express.static(Path.join(__dirname, '..', 'client', 'resources')));

application.use(Express.static(Path.join(__dirname, '..', 'client', 'secret', 'js')));

// Configure routers
application.use('/', HomeRouter);
application.use('/sessions', SessionsRouter);
application.use('/errors', ErrorsRouter);
application.use(ErrorsRouter);

// Create HTTP server
const server = HTTP.createServer(application);
server.listen(port);