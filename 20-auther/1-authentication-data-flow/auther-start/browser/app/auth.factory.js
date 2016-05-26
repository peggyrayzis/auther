app.factory('authFactory', function($http, currentUser){
	var authFactory = {};

	authFactory.submitLogin = function(user){
		return $http.post('/login', user)
		.then(function(response){
			return response.data;
		});
	};

	authFactory.createUser = function(user){
		return $http.post('/api/users', user)
		.then(function(user){
			// console.log('i am the user', user)
			return this.submitLogin(user.data);
		});
	};

	authFactory.isUser = function(name){
  	return name == currentUser.name
  }
	// signup submission function (post new user to database)

	return authFactory;
});