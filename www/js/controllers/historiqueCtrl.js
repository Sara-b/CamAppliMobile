angular.module('starter.controllers.HistoriqueCtrl', [])
.controller('HistoriqueCtrl', function($scope, $stateParams, logService){
  console.log('ok');

  var camId = $stateParams.camid;

  $scope.logs = "";
  $scope.users = {};


  $scope.query = logService.getByCamera(camId)
    .then(function(response){
      $scope.logs = response.data;
      console.log($scope.logs);
    });
  

});