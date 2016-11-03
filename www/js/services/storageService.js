angular.module('starter.services.storageService', [])
  .service('storageService', function($window){
    // set sessionStorage
    this.setStorage = function(key, data){
      return $window.sessionStorage.setItem(key, data);
    };

    // get sessionStorage
    this.getStorage = function(key){
      return $window.sessionStorage.getItem(key);
    };

    // rm sessionStorage
    this.delStorage = function(key){
      return $window.sessionStorage.removeItem(key);
    };

    // update sessionStorage
    this.updateStorage = function(key, data){
      return $window.sessionStorage.setItem(key, data);
    }
  });