app.controller('signupCtrl', function($scope, $state, authFactory){
	$scope.submitSignupForm = function(){
		authFactory.createUser($scope.newUser)
		.then(function(){
			$state.go('stories');
		});
	};
});