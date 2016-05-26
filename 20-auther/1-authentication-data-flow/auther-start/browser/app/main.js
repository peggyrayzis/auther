'use strict';

var app = angular.module('auther', ['ui.router']);

app.config(function ($urlRouterProvider, $locationProvider) {
	$locationProvider.html5Mode(true);
	$urlRouterProvider.when('/auth/:provider', function () {
		window.location.reload();
	});
	$urlRouterProvider.otherwise('/');
});


app.value('currentUser', {
	name: '',
	isAdmin: ''
});

app.run(function ($http, currentUser) {

	$http.get('/auth/me')
		.then(function (res) {
			return res.data;
		})
		.then(function (user) {
			if (user) {
				currentUser.name = user.name;
				currentUser.isAdmin = user.isAdmin;
			}
		});

});
