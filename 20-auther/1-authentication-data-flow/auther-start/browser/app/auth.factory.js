app.factory('authFactory', function($http){
	var authFactory = {};

	authFactory.submitLogin = function(user){
		return $http.post('/login', user)
		.then(function(response){
			return response;
		});
	};

	authFactory.createUser = function(user){
		return $http.post('/api/users', user)
		.then(function(user){
			// console.log('i am the user', user)
			return this.submitLogin(user.data);
		});
	};
	// signup submission function (post new user to database)

	return authFactory;
});