angular.module('starter.services.cameraService', [])
  .service('cameraService', function($http, storageService){

      this.get = function (cameraId) {
        return $http({
          method: 'GET',
          url: 'http://127.0.0.1:1337/camera/' + cameraId,
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization' : 'JWT ' + storageService.getStorage('token')
          },
          dataType: 'json',
          crossDomain: 'true'
        },
        function(err){
          console.log(err);
          return err;
        });
      };
    
    this.getAll = function(params){
      return $http({
        method: 'GET',
        url: 'http://127.0.0.1:1337/usercamerarole/'+ params +'/cameras',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'JWT ' + storageService.getStorage('token')
        },
        dataType: 'json',
        crossDomain: 'true'
      },
      function(err){
        console.log(err);
        return err;
      })
      .then(function(response){
        return response;
      });
    };

  	// Ajout de camera : addCameraCtrl
    this.addCamera = function (camera) {
	    return $http({
	      method: 'POST',
	      url: 'http://127.0.0.1:1337/camera/add',
	      headers: {
	          'Content-Type': 'application/x-www-form-urlencoded',
	          'Authorization': 'JWT ' + storageService.getStorage('token')
	      },
        dataType: 'json',
        transformRequest: function(obj) {
            var str = [];
            for(var p in obj)
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            return str.join("&");
        },
	      data: camera,
	      crossDomain: 'true'
	    },
      function(err){
        console.log(err);
        return err;
      })
      .success(function (response) {
        return response;
      });
    };

  });