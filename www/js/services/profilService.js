angular.module('starter.services.profilService', [])
  .service('profilService', function ($http, userFactory) {
    this.update = function (user) {
      return $http({
        method: 'PUT',
        url: 'http://127.0.0.1:1337/user/update',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization' : 'JWT ' + userFactory.token
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

    this.get = function (userId) {
      return $http({
        method: 'GET',
        url: 'http://127.0.0.1:1337/user/' + userId,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization' : 'JWT ' + userFactory.token
        },
        dataType: 'json',
        crossDomain: 'true'
      },
      function(err){
        console.log(err);
        return err;
      });
    }
  });