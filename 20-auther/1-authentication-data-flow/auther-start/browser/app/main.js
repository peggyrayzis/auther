'use strict';

var app = angular.module('auther', ['ui.router']);

app.config(function ($urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');
});

app.value('currentUser', {
	email: '',

	//how do we get current user?
	//we can get email/pass 
});
