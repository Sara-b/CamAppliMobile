angular.module('starter.services.logService', [])
  .service('logService', function($http, storageService){
    this.add = function(log){
      return $http({
        method: 'POST',
        url: 'http://127.0.0.1:1337/log/add',
        headers:{
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization' : 'JWT ' + storageService.getStorage('token')
        },
        dataType: 'json',
        data: log,
        crossDomain: 'true'
      });
    }

    this.getAll = function(){
      return $http({
        method: 'GET',
        url: 'http://127.0.0.1:1337/log',
        headers:{
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization' : 'JWT ' + storageService.getStorage('token')
        },
        dataType: 'json',
        crossDomain: 'true'
      });
    }

    
  });