angular.module('starter.controllers.LoginCtrl', [])
  .controller('LoginCtrl', function ($scope, $window, $state, loginService, userFactory) {
    // tab
    $scope.isAuth = window.sessionStorage.getItem('isAuth');

    // login function
    $scope.user = {
        email: '',
        password: ''
    }
    $scope.login = function (response) {

      loginService.signin($scope.user)
        .then(function (response) {

          $scope.email = response.data.user.email;
          $scope.token = response.data.token;
          var data = JSON.stringify(response.data);
          var isAuth = true;

          $window.sessionStorage.setItem('email', $scope.email);
          $window.sessionStorage.setItem('token', $scope.token);
          $window.sessionStorage.setItem('isAuth', isAuth);
          $window.sessionStorage.setItem('data', data);

          $state.transitionTo('tab.dashboard');
      });
    }
  });