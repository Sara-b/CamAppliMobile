angular.module('starter.services.userService', [])
  .service('userService', function($http, $window, storageService){

    // registerCtrl
    this.registration = function (user) {
      return $http({
        method: 'POST',
        url: 'http://127.0.0.1:1337/register',
        data: user
      });
    };

    // loginCtrl
    this.signin = function (user) {
      return $http({
        method: 'POST',
        url: 'http://127.0.0.1:1337/login',
        data: user
      });
    };

    // userUpdate
    this.update = function (user) {
      return $http({
        method: 'PUT',
        url: 'http://127.0.0.1:1337/user/update',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization' : 'JWT ' + storageService.getStorage('token')
        },
        dataType: 'json',
        transformRequest: function(obj) {
            var str = [];
            for(var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            return str.join("&");
        },
        data: user,
        crossDomain: 'true'
      },
      function(err){
        console.log(err);
        return err;
      });
    };

    // userGet
    this.get = function (userId) {
      return $http({
        method: 'GET',
        url: 'http://127.0.0.1:1337/user/' + userId,
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
    }

      // GET All users
    this.getAllUsers = function () {
        //Récupérer tous les utilisateurs
        //Au moment de la validation, si il existe deja un ucr avec le meme camid et le meme userid, message d'erreur
        return $http({
            method: 'GET',
            url: 'http://127.0.0.1:1337/user/',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'JWT ' + storageService.getStorage('token')
            },
            dataType: 'json',
            crossDomain: 'true'
        },
        function (err) {
            console.log(err);
            return err;
        });
    }
  });