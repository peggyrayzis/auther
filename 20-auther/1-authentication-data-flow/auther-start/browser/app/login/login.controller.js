app.controller('loginCtrl', function($scope, $state, currentUser, authFactory){
	$scope.login = function(){
		
		currentUser.email = $scope.user.email;

		authFactory.submitLogin($scope.user)
		.then(function(user){
			$state.go('stories');
		});

	};
});
