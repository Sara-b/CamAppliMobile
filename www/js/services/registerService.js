angular.module('starter.services.registerService', [])
  .service('registerService', function ($http) {
    this.registration = function (user) {
      return $http({
        method: 'POST',
        url: 'http://127.0.0.1:1337/register',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        dataType: 'json',
        data: user,
        crossDomain: 'true'
      })
        .success(function (response) {
            return response;
        })
        .error(function (response) {
            alert('Erreur : ' + response.error);
            return response;
            // console.log('erreur');
        });
    };
  });