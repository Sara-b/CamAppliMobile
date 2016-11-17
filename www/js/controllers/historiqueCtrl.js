angular.module('starter.controllers.HistoriqueCtrl', [])
.controller('HistoriqueCtrl', function($scope, $stateParams, logService){
	console.log('ok');

	var camId = $stateParams.camid;

	$scope.logs = "";
	$scope.users = {};


	$scope.query = logService.getByCamera(camId)
		.then(function(response){
			$scope.logs = response.data;
			// for(i = 0; i < $scope.logs.length; i++){
			// 	$scope.users[i] = $scope.logs[i].user.firstname;
			// }


			console.log($scope.users);
		});
	

});