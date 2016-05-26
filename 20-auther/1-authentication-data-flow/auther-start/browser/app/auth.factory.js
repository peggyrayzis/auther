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
			return this.submitLogin(user.data);
		});
	};

	authFactory.isUser = function(name){
		if(currentUser.isAdmin === true) return true;
  	return name == currentUser.name;
  };

	return authFactory;
});