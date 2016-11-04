angular.module('starter.services.cameraService', ['ngSails'])
  .service('cameraService', function($http, storageService,$sails){

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
    
    //TODO remettre le header
    this.getAll = function(params){
      return $sails.get('http://127.0.0.1:1337/usercamerarole/'+ params +'/cameras')
     }, function(err){
        console.log(err);
        console.log('Houston, we got a problem!');
      };
    
        // headers: {
        //   'Content-Type': 'application/x-www-form-urlencoded',
        //   'Authorization': 'JWT ' + storageService.getStorage('token')
        // },
       // dataType: 'json',
       // crossDomain: 'true'
    
     
   

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
    
    
    this.updateCam = function (data) {
        return $http({
            method: 'PUT',
            url: 'http://127.0.0.1:1337/camera/update',
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded',
                "Authorization": 'JWT ' + storageService.getStorage('token')
            },
            dataType: 'json',
            transformRequest: function(obj) {
                var str = [];
                for(var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            },
            data: data,
            crossDomain: 'true'
        })
          .success(function (response) {
              return response;
          })
          .error(function (response) {
              console.log('Erreur : ' + JSON.stringify(response));
              return response;
          });
      }

  });