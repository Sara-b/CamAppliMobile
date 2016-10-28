angular.module('starter.controllers.LoginCtrl', [])
  .controller('LoginCtrl', function ($scope, $window, $state, loginService, userFactory, $location) {
    // // tab
    // $scope.isAuth = window.sessionStorage.getItem('isAuth');

    // login function
    $scope.user = { email: '', password: '' };

    $scope.login = function (response, event) {
      loginService.signin($scope.user)
        .then(function (response) {
          if(response.status == 200){
            var data = JSON.stringify(response.data);
            var isAuth = true;
            var token = response.data.token;
            var email = response.data.user.email;

            // console.log(response);
            // console.log(data);

            loginService.setStorage('data', data);
            loginService.setStorage('isAuth', isAuth);
            loginService.setStorage('token', token);
            loginService.setStorage('email', email);
            $state.go('tab.dashboard');
          }else{
            console.log($scope.user);
            console.log(response);
            $scope.message = 'Une erreur est survenue';
            return $scope.message;
          }
        }
          ,function(err, response){
            console.log(response);
            console.log(err);
            console.log(err.status);
            console.log(err.config);
            console.log(err.config.data);
            $state.reload();
          }
        );
    };
  });