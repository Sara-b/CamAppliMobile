angular.module('starter.controllers.CameraSettingsCtrl', [])
  .controller('CameraSettingsCtrl', function($http, $state, $scope, cameraService, $stateParams, storageService, roleService){
      console.log('ok');

      cameraService.get($stateParams.camid)
      .then(function(response){
          $scope.camera = response;
          console.log($scope.camera);
          return $scope.camera;
      });

      roleService.get($stateParams.camid)
      .then(function (response) {
          $scope.users = response.data;
          return $scope.users;
      });



      $scope.updateName = function (response) {
          cameraService.updateCam($scope.camera)
            .then(function (response) {
                if (response.status == 200) {
                    console.log($scope.user);
                    $state.go('tab.camera-settings', { camid: $scope.camera.id });
                } else {
                    $scope.message = 'Une erreur est survenue';
                    return $scope.message;
                }
            },
            function(err){
                return err;
            })
      }

      $scope.navigateUserRole = function (ucrid, response) {
          $state.go('tab.userRole', { ucrid: ucrid });
      }

  });