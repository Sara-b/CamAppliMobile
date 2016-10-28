angular.module('starter.controllers.CameraCtrl', [])
  .controller('CameraCtrl', function(CameraService, $stateParams){
    console.log('ok');
    $stateParams.id = 1;

    $scope.data = $http.get('http://127.0.0.1:1337/camera/' + $stateParams.id, {
      method: 'GET',
      headers: {
        "Content-Type": 'application/x-www-form-urlencoded',
        "Authorization": 'JWT ' + userFactory.token
      }
    })
    .then(function(response){
      $scope.cameras = response.data;
      return $scope.cameras;
    });
  });