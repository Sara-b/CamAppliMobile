angular.module('starter.services.CameraService', [])
  .service('CameraService', function($resource, userFactory){
    // var data = $resource('http://127.0.0.1:1337/usercamerarole/:userid/cameras', {}, {
    //   'get': { method: 'GET', params:{userid: '@id'}, headers:{ "Content-Type": 'application/x-www-form-urlencoded', "Authorization": 'JWT ' + userFactory.token}, isArray:true }
    // });
    // return data;
  });