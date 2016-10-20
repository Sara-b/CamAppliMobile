angular.module('starter.controllers.LoginCtrl', [])
  .controller('LoginCtrl', function ($scope, $window, $state, loginService, userFactory) {
    $scope.user = {
        email: '',
        password: ''
    }
    $scope.login = function (response) {

      loginService.signin($scope.user)
        .then(function (response) {
          console.log(response);
          console.log('connecté');

          $scope.email = response.data.user.email;
          $scope.token = response.data.token;
          var data = JSON.stringify(response.data);
          var isAuth = false;

          // console.log($scope.email = response.data.user.email);
          // console.log($scope.token = response.data.token);
          // console.log(data);

          $window.sessionStorage.setItem('email', $scope.email);
          $window.sessionStorage.setItem('token', $scope.token);
          $window.sessionStorage.setItem('isAuth', true);
          $window.sessionStorage.setItem('data', data);

          $state.go('tab.dashboard');
      });
    }
  });