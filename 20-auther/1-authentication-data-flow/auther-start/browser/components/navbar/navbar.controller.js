app.controller('navbarCtrl', function($http, $state, currentUser, $scope){
	$scope.logout = function(){
		return $http.get('/logout');
	};
});