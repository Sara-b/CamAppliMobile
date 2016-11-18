angular.module('starter.services.userService', ['ngSails'])
    .service('userService', function ($http, $window, storageService, $sails, $q) {

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
            var defered = $q.defer();
            $sails.request({
                method: 'PUT',
                url: 'http://127.0.0.1:1337/user/update',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'JWT ' + storageService.getStorage('token')
                },
                data: user,
            }, function (resData, jwres) {
                if (jwres.error) {
                    return defered.reject(jwres.error);
                }
                return defered.resolve(resData);
            });

            return defered.promise;
        };

        // userGet
        this.get = function (userId) {
            var defered = $q.defer();
            $sails.request({
                    method: 'GET',
                    url: 'http://127.0.0.1:1337/user/' + userId,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': 'JWT ' + storageService.getStorage('token')
                    },
                    dataType: 'json',
                    crossDomain: 'true'
                },
                function (resData, jwres) {
                    if (jwres.error) {
                        return defered.reject(jwres.error);
                    }
                    return defered.resolve(resData);
                });

            return defered.promise;
        };


        // GET All users
        this.getAllUsers = function () {
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