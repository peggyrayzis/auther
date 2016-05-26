app.controller('navbarCtrl', function($http, $state, currentUser, $scope){
	$scope.currentUser = currentUser;

	$scope.logout = function(){
		return $http.get('/logout');
	};
});