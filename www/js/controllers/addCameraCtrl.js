angular.module('starter.controllers.AddCameraCtrl', [])
  .controller('AddCameraCtrl', function ($scope, cameraService) {
    $scope.camera = {
      name: '',
      uid: ''
    }

    $scope.addCamera = function (response) {
      console.log($scope.camera);
      cameraService.addCamera($scope.camera)
        .then(function (response) {
          console.log(response);
        });
    }
  });
