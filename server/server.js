const HTTP = require('http');
const Path = require('path');
const Express = require('express');
const MongoStore = require('connect-mongo');
const Mongoose = require('mongoose');
const Nunjucks = require('nunjucks');
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
application.set('view engine', 'njk');
application.set('website-port', port);
application.set('client-path', Path.join(__dirname, '..', 'client'));

// Configure parsing of response bodies
application.use(Express.json());
application.use(Express.urlencoded({
	extended: true
}));

// Configure Nunjucks
Nunjucks.configure(Path.join(__dirname, 'templates'), {
	autoescape: true,
	express: application
});

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
application.use(Express.static(Path.join(__dirname, '..', 'client', 'css')));
application.use(Express.static(Path.join(__dirname, '..', 'client', 'js', 'dist')));
application.use(Express.static(Path.join(__dirname, '..', 'client', 'resources')));

// Configure routers
application.use('/', HomeRouter);
application.use('/sessions', SessionsRouter);
application.use(ErrorsRouter);

// Create HTTP server
const server = HTTP.createServer(application);
server.listen(port);