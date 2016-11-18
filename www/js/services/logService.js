angular.module('starter.services.logService', ['ngSails'])
    .service('logService', function ($http, storageService, $sails, $q) {

        this.add = function (log) {
            return $http({
                method: 'POST',
                url: 'http://127.0.0.1:1337/log/add',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'JWT ' + storageService.getStorage('token')
                },
                dataType: 'json',
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: log,
                crossDomain: 'true'
            }).then(function (response) {
                return response;
            });
        }

        this.getByCamera = function (camId) {
            var defered = $q.defer();
            $sails.request({
                method: 'GET',
                url: 'http://127.0.0.1:1337/log/camera/' + camId,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'JWT ' + storageService.getStorage('token')
                }
            }, function (resData, jwres) {
                if (jwres.error) {
                    return defered.reject(jwres.error);
                }
                return defered.resolve(resData);
            });

            return defered.promise;
        };


    });