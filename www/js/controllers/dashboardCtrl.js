angular.module('starter.controllers.DashboardCtrl', [])
  .controller('DashboardCtrl', function ($http, $state, $scope, $stateParams, cameraService, userService, storageService) {

    $scope.dataStored = storageService.getStorage('data');

    if($scope.dataStored == ""){
      $state.reload();
    }
    else{
      $scope.user = JSON.parse($scope.dataStored);
      var userid = $scope.user.user.id;

      var data = cameraService.getAll(userid);
      data.then(function(response){

          $scope.cameras = response.data;
          console.log($scope.cameras);
          return $scope.cameras;
        });

      $scope.addCamera = function(){
        $state.go('tab.addCamera');
      }
    }

});