angular.module('starter.services.loginService', [])
  .service('loginService', function ($http, $window) {
    this.signin = function (user) {
      return $http({
        method: 'POST',
        url: 'http://127.0.0.1:1337/login',
        data: user
      });
    };

    this.setStorage = function(key, data){
      return $window.sessionStorage.setItem(key, data);
    };
    this.getStorage = function(key){
      return $window.sessionStorage.getItem(key);
    };
  });