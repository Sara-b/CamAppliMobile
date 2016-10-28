angular.module('starter.services.registerService', [])
  .service('registerService', function ($http) {
    this.registration = function (user) {
      return $http({
        method: 'POST',
        url: 'http://127.0.0.1:1337/register',
        data: user
      });
    };
  });