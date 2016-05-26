'use strict';

var app = require('express')();
var path = require('path');
var session = require('express-session');
var chalk = require('chalk');
var User = require('../api/users/user.model.js')
var passport = require('passport')

app.use(require('./logging.middleware'));

app.use(require('./request-state.middleware'));

app.use(require('./statics.middleware'));

app.use(session({
  secret: 'hulahoop'
}));

app.use(passport.initialize());
app.use(passport.session());


app.use('/api', function (req, res, next) {
  if (!req.session.counter) req.session.counter = 0;
  console.log(chalk.cyan('counter'), ++req.session.counter);
  next();
});

app.use('/auth/me', function (req, res, next) {
  if (req.user) {
    User.findOne({
        where: {
          id: req.user.dataValues.id
        }
      })
      .then(function (user) {
        res.json(user);
      });
  } else {
    User.findOne({
        where: {
          id: req.session.userId
        }
      })
      .then(function (user) {
        res.json(user)
      })
  }
});

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id)
    .then(function (user) {
      done(null, user);
    })
    .catch(done);
});

app.use(function (req, res, next) {
  console.log(chalk.magenta('session'), req.session);
  console.log(chalk.yellow('session user Id'), req.session.userId);
  console.log(chalk.green('google user'), req.user);
  next();
});

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
passport.use(
  new GoogleStrategy({
      clientID: '183977690491-varl5j9di3aln5ooie2hh9o0g8ok5qb4.apps.googleusercontent.com',
      clientSecret: 'GbKO7QfofuAGHAaMNhbQdG2B',
      callbackURL: 'http://localhost:8080/auth/google/callback'
    },

    // Google will send back the token and profile
    function (token, refreshToken, profile, done) {

      var info = {
        name: profile.displayName,
        email: profile.emails[0].value,
        photo: profile.photos ? profile.photos[0].value : undefined
      };
      User.findOrCreate({
          where: { googleId: profile.id },
          defaults: info
        })
        .spread(function (user) {
          done(null, user);
        })
        .catch(done);
    })
);

// Google authentication and login 
app.get('/auth/google', passport.authenticate('google', { scope: 'email' }));

// handle the callback after Google has authenticated the user
app.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: 'http://localhost:8080/stories', // or wherever
    failureRedirect: 'http://localhost:8080/' // or wherever
  })
);


app.post('/login', function (req, res, next) {
  User.findOne({
      where: req.body
    })
    .then(function (user) {
      if (!user) {
        res.sendStatus(401);
      } else {
        req.session.userId = user.id;
        res.json(user);
        // res.sendStatus(204);
      }
    })
    .catch(next);
});

app.get('/logout', function (req, res, next) {
  req.session.userId = null;
  res.sendStatus(204);
});

app.use('/api', require('../api/api.router'));


var validFrontendRoutes = ['/', '/stories', '/users', '/stories/:id', '/users/:id', '/signup', '/login'];
var indexPath = path.join(__dirname, '..', '..', 'public', 'index.html');
validFrontendRoutes.forEach(function (stateRoute) {
  app.get(stateRoute, function (req, res) {
    res.sendFile(indexPath);
  });
});

app.use(require('./error.middleware'));

module.exports = app;
