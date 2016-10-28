angular.module('starter.services.profilService', [])
  .service('profilService', function ($http) {
    this.update = function (user) {
      return $http({
        method: 'POST',
        url: 'http://127.0.0.1:1337/user/update',
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