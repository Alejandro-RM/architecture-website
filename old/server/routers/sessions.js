const crypto = require('crypto');
const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/user');
const user = require('../models/user');
const sessions_router = express.Router();

// Set up the local password strategy
passport.use(new LocalStrategy({
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

		crypto.pbkdf2(password, user.salt, 300000, 32, 'sha256', (error, hashed_password) => {
			if(error)
				return done(error);
			else if(!crypto.timingSafeEqual(user.password, hashed_password))
				return done(null, false, {
					message: 'login-error'
				});
			else
				return done(null, user);
		});
	});
}));

// Present the login form
sessions_router.get('/login', (request, response, next) => {
	response.render('login', {
		website_title: request.app.get('website-title'),
		navigation_bar: request.app.get('website-navbar'),
		page_title: request.app.get('website-default-language')['login-form']['login'],
		theme: request.session.theme ? request.session.theme : request.app.get('website-default-theme'),
		language: request.app.get('website-default-language'),
		errors: request.session.messages || [],
		user: {
			role: 'guest'
		}
	});
});

// Process the login form
sessions_router.post('/login', passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/sessions/login',
	failureMessage: true
}));

// Present the signup form
sessions_router.get('/signup', (request, response, next) => {
	response.render('signup', {
		website_title: request.app.get('website-title'),
		navigation_bar: request.app.get('website-navbar'),
		page_title: request.app.get('website-default-language')['signup-form']['signup'],
		theme: request.session.theme ? request.session.theme : request.app.get('website-default-theme'),
		language: request.app.get('website-default-language'),
		user: {
			role: 'guest'
		}
	});
});

// Process the signup form
sessions_router.post('/signup', (request, response, next) => {
	User.create({
		username: request.body.username

	});
	response.redirect('/home');
});

// Process the logout request
sessions_router.post('/logout', (request, response, next) => {
	request.logout((error) => {
		if(error)
			return next(error);
		response.redirect('/home');
	});
});

// Process the theme change request
sessions_router.post('/theme', (request, response, next) => {
	request.session.theme = request.body.theme == 'dark' ? 'light' : 'dark';
});

passport.serializeUser((user, done) => {
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

passport.deserializeUser((user, done) => {
	process.nextTick(() => {
		return done(null, user);
	});
});

module.exports = sessions_router;