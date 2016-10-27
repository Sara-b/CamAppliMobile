angular.module('starter.controllers.AddCameraCtrl', [])
  .controller('AddCameraCtrl', function ($scope, addCameraService) {
    $scope.camera = {
      name: '',
      uid: ''
    }

    $scope.addCamera = function (response) {
      console.log($scope.camera);
      addCameraService.addCamera($scope.camera)
        .then(function (response) {
          console.log(response);
        });
    }
  });
