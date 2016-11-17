angular.module('starter.services.roleService', ['ngSails'])
  .service('roleService', function ($http, storageService, $sails, $q) {

      // GET Camera users
      this.get = function (camId) {
          var defered = $q.defer();
           $sails.request({
              method: 'GET',
              url: 'http://127.0.0.1:1337/usercamerarole/' + camId + '/users',
              headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                  'Authorization': 'JWT ' + storageService.getStorage('token')
              }
           }, function (resData, jwres) {
            if (jwres.error) {
                return defered.reject(jwres.error);
            }
            return  defered.resolve(resData);
            });

            return defered.promise;
      };

      this.getUcrById = function (ucrid) {
          var defered = $q.defer();
           $sails.request({
              method: 'GET',
              url: 'http://127.0.0.1:1337/usercamerarole/' + ucrid + '/role',
              headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                  'Authorization': 'JWT ' + storageService.getStorage('token')
              }
          }, function (resData, jwres) {
            if (jwres.error) {
                return defered.reject(jwres.error);
            }
            return  defered.resolve(resData);
            });

            return defered.promise;
      };

      // GET All roles
      this.getRoles = function () {
          var defered = $q.defer();
           $sails.request({
              method: 'GET',
              url: 'http://127.0.0.1:1337/role',
              headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                  'Authorization': 'JWT ' + storageService.getStorage('token')
              }
           }, function (resData, jwres) {
            if (jwres.error) {
                return defered.reject(jwres.error);
            }
            return  defered.resolve(resData);
            });

            return defered.promise;
      };

      this.updateRole = function (ucrid, roleid) {
          var defered = $q.defer();
           $sails.request({
              method: 'PUT',
              url: 'http://127.0.0.1:1337/usercamerarole/update',
              headers: {
                  "Content-Type": 'application/x-www-form-urlencoded',
                  "Authorization": 'JWT ' + storageService.getStorage('token')
              },
                 data: { role: roleid, id: ucrid }
          }, function (resData, jwres) {
            if (jwres.error) {
                return defered.reject(jwres.error);
            }
            return  defered.resolve(resData);
            });

            return defered.promise;
      };

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