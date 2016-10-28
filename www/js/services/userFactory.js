angular.module('starter.services.userFactory', [])
  .factory('userFactory', function(){
    var User = {};
    if(
      window.sessionStorage.getItem('token') === null &&
      window.sessionStorage.getItem('data') === null &&
      window.sessionStorage.getItem('isAuth') === null
    ){
      User.isAuth = false;
      User.data = '';
      User.token = '';
      return User;
    }else{
      User.isAuth = window.sessionStorage.getItem('isAuth');
      User.data = window.sessionStorage.getItem('data');
      User.token = window.sessionStorage.getItem('token');
      return User;
    }
  });