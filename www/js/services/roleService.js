angular.module('starter.services.roleService', [])
  .service('roleService', function ($http, storageService) {

      // GET Camera users
      this.get = function (camId) {
          return $http({
              method: 'GET',
              url: 'http://127.0.0.1:1337/usercamerarole/' + camId + '/users',
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

      // Récupérer les utilisateurs d'une camera
      this.get = function (camId) {
          return $http({
              method: 'GET',
              url: 'http://127.0.0.1:1337/usercamerarole/' + camId + '/users',
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

      this.getUcrById = function (ucrid) {
          return $http({
              method: 'GET',
              url: 'http://127.0.0.1:1337/usercamerarole/' + ucrid + '/role',
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

      // GET All roles
      this.getRoles = function () {
          return $http({
              method: 'GET',
              url: 'http://127.0.0.1:1337/role',
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

      this.updateRole = function (ucrid, roleid) {
          return $http({
              method: 'PUT',
              url: 'http://127.0.0.1:1337/usercamerarole/update',
              headers: {
                  "Content-Type": 'application/x-www-form-urlencoded',
                  "Authorization": 'JWT ' + storageService.getStorage('token')
              },
              dataType: 'json',
              transformRequest: function (obj) {
                  var str = [];
                  for (var p in obj)
                      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                  return str.join("&");
              },
              data: { role: roleid, id: ucrid },
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

      this.addUCR = function (camid, userid, roleid) {
          return $http({
              method: 'POST',
              url: 'http://127.0.0.1:1337/usercamerarole/add',
              headers: {
                  "Content-Type": 'application/x-www-form-urlencoded',
                  "Authorization": 'JWT ' + storageService.getStorage('token')
              },
              dataType: 'json',
              transformRequest: function (obj) {
                  var str = [];
                  for (var p in obj)
                      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                  return str.join("&");
              },
              data: { camera: camid, user: userid, role: roleid },
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