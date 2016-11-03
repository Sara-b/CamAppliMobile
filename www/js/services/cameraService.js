angular.module('starter.services.cameraService', [])
  .service('cameraService', function($http, storageService){
    
    this.get = function(params){
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
      });
    };

    
  });