angular.module('starter.services.userFactory', [])
  .factory('userFactory', function(){
    var User = {};
    if(
      window.sessionStorage.getItem('username') === null &&
      window.sessionStorage.getItem('token') === null &&
      window.sessionStorage.getItem('data') === null &&
      window.sessionStorage.getItem('isAuth') === false
    ){
      User.isAuth = false;
      User.data = '';
      return User;
    }else{
      User.isAuth = window.sessionStorage.getItem('isAuth');
      User.data = window.sessionStorage.getItem('data');
      return User;
    }
  });