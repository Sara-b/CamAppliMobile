angular.module('starter.services.cameraService', [])
  .service('cameraService', function($http, $stateParams, userFactory){

      this.get = function (cameraId) {
        return $http({
          method: 'GET',
          url: 'http://127.0.0.1:1337/camera/' + cameraId,
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization' : 'JWT ' + userFactory.token
          },
          dataType: 'json',
          crossDomain: 'true'
        },
        function(err){
          console.log(err);
          return err;
        });
      };

  });