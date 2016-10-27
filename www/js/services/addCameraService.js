angular.module('starter.services.addCameraService', [])
  .service('addCameraService', function ($http) {
    this.addCamera = function (camera) {
      return $http({
        method: 'POST',
        url: 'http://127.0.0.1:1337/addCamera',
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
