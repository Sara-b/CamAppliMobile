angular.module('starter.services.loginService', [])
  .service('loginService', function ($http) {
    this.signin = function (user) {
      return $http({
        method: 'POST',
        url: 'http://127.0.0.1:1337/login',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        dataType: 'json',
        data: user,
        crossDomain: 'true'
      });
    };
  });