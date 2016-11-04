angular.module('starter.controllers.CameraSettingsCtrl', [])
  .controller('CameraSettingsCtrl', function($http, $state, $scope, cameraService, $stateParams, storageService){
      console.log('ok');

      $scope.data = $http.get('http://127.0.0.1:1337/camera/' + $stateParams.camid, {
          method: 'GET',
          headers: {
              "Content-Type": 'application/x-www-form-urlencoded',
              "Authorization": 'JWT ' + storageService.getStorage('token')
          }
      })
      .then(function(response){
          $scope.camera = response.data;
          console.log($scope.camera);
          return $scope.camera;
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

  });