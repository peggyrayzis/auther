app.controller('loginCtrl', function($scope, $state, currentUser, authFactory){

	$scope.login = function(){

		authFactory.submitLogin($scope.user)
		.then(function(user){
			currentUser.name = user.name;
			currentUser.isAdmin = user.isAdmin;
			$state.go('stories');
		});

	};
});
