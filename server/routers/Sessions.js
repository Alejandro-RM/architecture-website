const Cryptography = require('crypto');
const Express = require('express');
const Passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/User');
const SessionsRouter = Express.Router();

// Set up the local password strategy
Passport.use(new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password'
	}, (email, password, done) => {
	User.findOne().where('email').equals(email).exec((error, user) => {
		if(error)
			return done(error);
		if(!user)
			return done(null, false, {
				message: 'Incorrect email or password.'
			});

		Cryptography.pbkdf2(password, user.salt, 300000, 32, 'sha256', (error, hashed_password) => {
			if(error)
				return done(error);
			else if(!Cryptography.timingSafeEqual(user.password, hashed_password))
				return done(null, false, {
					message: 'login-error'
				});
			else
				return done(null, user);
		});
	});
}));

// Login
SessionsRouter.get('/login', (request, response, next) => {
	response.render('base', {
		script_name: 'login'
	});
});

// Login processing
SessionsRouter.post('/login', Passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/sessions/login',
	failureMessage: true
}));

// Signup
SessionsRouter.get('/signup', (request, response, next) => {
	response.render('base', {
		script_name: 'signup'
	});
});

// Signup processing
SessionsRouter.post('/signup', (request, response, next) => {
	User.create({
		username: request.body.username
	});
	response.redirect('/home');
});

// Logout processing
SessionsRouter.post('/logout', (request, response, next) => {
	request.logout((error) => {
		if(error)
			return next(error);
		response.redirect('/home');
	});
});

// User information
SessionsRouter.get('/user', (request, response, next) => {
	response.json(request.user ? request.user : {
		role: 'guest',
		preferences: {
			theme: 'dark'
		}
	});
});

Passport.serializeUser((user, done) => {
	process.nextTick(() => {
		done(null, {
			username: user.username,
			first_name: user.first_name,
			last_name: user.last_name,
			email: user.email,
			profile_image_path: user.profile_image_path,
			role: user.role
		});
	});
});

Passport.deserializeUser((user, done) => {
	process.nextTick(() => {
		return done(null, user);
	});
});

module.exports = SessionsRouter;