angular.module('starter.controllers.DashboardCtrl', [])
  .controller('DashboardCtrl', function ($http, $state, $scope, dashboardService, userFactory) {
    $scope.isAuth = userFactory.isAuth;
    $scope.cameras = {};

    $scope.data = $http.get('http://127.0.0.1:1337/usercamerarole/1/cameras', {
      method: 'GET',
      headers: {
        "Content-Type": 'application/x-www-form-urlencoded',
        "Authorization": 'JWT ' + userFactory.token
      }
    })
    .then(function(response){
      $scope.cameras = response.data;
      console.log($scope.cameras);
      return $scope.cameras;
    });

  });