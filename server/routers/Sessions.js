const Cryptography = require('crypto');
const Express = require('express');
const Passport = require('passport');
const LocalStrategy = require('passport-local');
const AnonymousStrategy = require('passport-anonymous').Strategy;
const User = require('../models/User');
const SessionsRouter = Express.Router();

// Set guests strategy
Passport.use(new AnonymousStrategy());

// Set up the local password strategy
Passport.use(new LocalStrategy({
		usernameField: 'account-number',
		passwordField: 'password'
	}, (account_number, password, done) => {
	User.findOne().where('account_number').equals(account_number).exec((error, user) => {
		if(error)
			return done(error);
		if(!user)
			return done(null, false, {
				message: 'Número de cuenta incorrecto.'
			});

		Cryptography.pbkdf2(password, user.salt, 300000, 32, 'sha256', (error, hashed_password) => {
			if(error)
				return done(error);
			else if(!Cryptography.timingSafeEqual(user.password, hashed_password))
				return done(null, false, {
					message: 'Contraseña incorrecta.'
				});
			else
				return done(null, user);
		});
	});
}));

// Login processing
SessionsRouter.post('/login', Passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/sessions/login.html',
	failureMessage: 'Número de cuenta o contraseña érroneos.'
}));

SessionsRouter.post('/create-user', (request, response, next) => {
    salt = Cryptography.randomBytes(16);
    Cryptography.pbkdf2(request.body.account_number, salt, 300000, 32, 'sha256', function(error, hashed_password) {
        if(error)
            return next(error);

        User.create({
            account_number: request.body.account_number,
            password: hashed_password,
            salt: salt
        }, (error, user) => {
            if(error)
                if(request.session.messages)
                    request.session.messages.push(error);
                else
                    request.session.messages = [error];
        });
    });
    response.redirect('/');
});

// Signup processing
SessionsRouter.post('/signup', (request, response, next) => {
    User.findOne().where('account_number').equals(account_number).exec((error, user) => {
        if(error)
			return done(error);
		if(!user)
			return done(null, false, {
				message: 'Número de cuenta incorrecto.'
			});

        salt = Cryptography.randomBytes(16);
        Cryptography.pbkdf2(request.body.password, salt, 300000, 32, 'sha256', function(error, hashed_password) {
            if(error)
                return next(error);

            user.first_name = request.body.first_name;
            user.last_name = request.body.last_name;
            user.email = request.body.email;
            user.profile_image = request.body.profile_image;
            user.salt = salt;
            user.password = hashed_password;

            user.validate((error) => {
                if(error)
                    return done(error);
                user.save();
            });
        });
    });
	response.redirect('/');
});

// Logout processing
SessionsRouter.post('/logout', (request, response, next) => {
	request.logout((error) => {
		if(error)
			return next(error);
		response.redirect('/');
	});
});

// User information
SessionsRouter.get('/user', (request, response, next) => {
	response.json(request.user ? request.user : {
		role: 'guest'
	});
});

Passport.serializeUser((user, done) => {
	process.nextTick(() => {
		done(null, {
			first_name: user.first_name,
			last_name: user.last_name,
			email: user.email,
            account_number: user.account_number,
			profile_image: `${user.images_path}/${user.profile_image}`,
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