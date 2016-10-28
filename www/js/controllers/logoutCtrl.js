angular.module('starter.controllers.LogoutCtrl', [])
  .controller('LogoutCtrl', function($window, $state, userFactory){
    userFactory.isAuth = false;
    userFactory.data = '';
    $window.sessionStorage.removeItem('data');
    $window.sessionStorage.removeItem('email');
    $window.sessionStorage.removeItem('isAuth');
    $window.sessionStorage.removeItem('token');
    $state.go('login');
  });