angular.module('starter.controllers.LoginCtrl', [])
    .controller('LoginCtrl', function ($scope, $state, userService, storageService) {

        $scope.user = {email: '', password: ''};

        $scope.login = function (response, event) {
            userService.signin($scope.user)
                .then(function (response) {
                        if (response.status == 200) {

                            var data = JSON.stringify(response.data);
                            var isAuth = true;
                            var token = response.data.token;
                            var email = response.data.user.email;

                            storageService.setStorage('data', data);
                            storageService.setStorage('isAuth', isAuth);
                            storageService.setStorage('token', token);
                            storageService.setStorage('email', email);

                            $state.go('tab.dashboard');
                        } else {
                            $scope.message = 'Une erreur est survenue';
                            return $scope.message;
                        }
                    }
                    , function (err, response) {
                        console.log(response);
                        console.log(err);
                    }
                );
        };
    });