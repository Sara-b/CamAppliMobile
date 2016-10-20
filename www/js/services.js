angular.module('starter.services', [])

    .service('registerService', function ($http) {
        this.registration = function (user) {
            return $http({
                method: 'POST',
                url: 'http://127.0.0.1:1337/register',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                dataType: 'json',
                data: user,
                crossDomain: 'true'
            })
                .success(function (response) {
                    return response;
                })
                .error(function (response) {
                    alert('Erreur : ' + response.error);
                    return response.error;
                    // console.log('erreur');
                });
        };
    })
    .service('loginService', function ($http) {
        this.signin = function (user) {
            return $http({
                method: 'POST',
                url: 'http://127.0.0.1:1337/login',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                dataType: 'json',
                data: user,
                crossDomain: 'true'
            }).success(function (response) {
                return response;
            }).error(function (response) {
                // alert('Erreur : ' + response.error);
                return response.error;
            });
        };
    })
    .service('dashboardService', function ($http) {
        this.dashboard = function (user, token) {
            return $http({
                method: 'POST',
                url: 'http://127.0.0.1:1337/dashboard',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                dataType: 'json',
                data: [user,token],
                crossDomain: 'true'
            }).success(function (response) {
                return response;
            }).error(function (response) {
                return response.error;
            });
        };
    })



    .factory('Chats', function () {
        // Might use a resource here that returns a JSON array

        // Some fake testing data
        var chats = [{
            id: 0,
            name: 'Ben Sparrow',
            lastText: 'You on your way?',
            face: 'img/ben.png'
        }, {
            id: 1,
            name: 'Max Lynx',
            lastText: 'Hey, it\'s me',
            face: 'img/max.png'
        }, {
            id: 2,
            name: 'Adam Bradleyson',
            lastText: 'I should buy a boat',
            face: 'img/adam.jpg'
        }, {
            id: 3,
            name: 'Perry Governor',
            lastText: 'Look at my mukluks!',
            face: 'img/perry.png'
        }, {
            id: 4,
            name: 'Mike Harrington',
            lastText: 'This is wicked good ice cream.',
            face: 'img/mike.png'
        }];

        return {
            all: function () {
                return chats;
            },
            remove: function (chat) {
                chats.splice(chats.indexOf(chat), 1);
            },
            get: function (chatId) {
                for (var i = 0; i < chats.length; i++) {
                    if (chats[i].id === parseInt(chatId)) {
                        return chats[i];
                    }
                }
                return null;
            }
        };
    });