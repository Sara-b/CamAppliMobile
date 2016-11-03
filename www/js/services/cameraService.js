angular.module('starter.services.cameraService', [])
  .service('CameraService', function (userFactory, $http, $stateParams) {

    
      this.updateCam = function (data) {
          $http.put('http://127.0.0.1:1337/camera/update/', {
              headers: {
                  "Content-Type": 'application/x-www-form-urlencoded',
                  "Authorization": 'JWT ' + userFactory.token
              },
              dataType: 'json',
              data: data,
              crossDomain: 'true'
          })
      }

  });