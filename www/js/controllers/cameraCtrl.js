angular.module('starter.controllers.CameraCtrl', [])
  .controller('CameraCtrl', function($http, $scope, CameraService, $stateParams, userFactory){
      console.log('ok');
    

      $scope.data = $http.get('http://127.0.0.1:1337/camera/' + $stateParams.camid, {
          method: 'GET',
          headers: {
              "Content-Type": 'application/x-www-form-urlencoded',
              "Authorization": 'JWT ' + userFactory.token
          }
      })
      .then(function(response){
          $scope.camera = response.data;
          return $scope.camera;
      });



      $scope.updateName = function (response) {
          console.log(JSON.stringify($scope.camera));
          CameraService.updateCam($scope.camera)
              .then(function (response) {
                  if (response.status == 200) {
                      console.log($scope.user);
                      $state.go('tab.camera-settings', { camid: data.id });
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