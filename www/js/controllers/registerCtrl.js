angular.module('starter.controllers.RegisterCtrl', [])
  .controller('RegisterCtrl', function ($scope, registerService) {
    $scope.user = {
      lastname: '',
      firstname: '',
      password: '',
      email: '',
      username: ''
    }

    $scope.register = function (response) {
      console.log($scope.user);
      registerService.registration($scope.user)
        .then(function (response) {
          console.log(response);
        });
    }
  });