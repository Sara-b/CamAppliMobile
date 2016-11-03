angular.module('starter.controllers.DashboardCtrl', [])
  .controller('DashboardCtrl', function ($http, $state, $scope, $stateParams, cameraService, userService, storageService) {

    $scope.dataStored = storageService.getStorage('data');

    if ($scope.dataStored == "") {
        $state.reload();
    }
    else {
        $scope.user = JSON.parse($scope.dataStored);
        var userid = $scope.user.user.id;

        var data = cameraService.getAll(userid);
        data.then(function (response) {

        $scope.cameras = response.data;

          for(i = 0; i < $scope.cameras.length; i++){
            
            var isOwner;
            var userId = $scope.cameras[i].user.id;
            var cameraId = $scope.cameras[i].camera.owner;
            
            if(userId == cameraId){
              $scope.cameras[i].isOwner = true;
            }else{
              $scope.cameras[i].isOwner = false;
            }

            $scope.isOwner = $scope.cameras[i].isOwner;
          }
          return $scope.cameras;
        });

      $scope.addCamera = function(){
        $state.go('tab.addCamera');
      }
    }

    $scope.openSettings = function (cameraid) {
        $state.go('tab.camera-settings', { camid: cameraid });
    }
});