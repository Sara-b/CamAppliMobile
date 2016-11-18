angular.module('starter.controllers.LogoutCtrl', [])
    .controller('LogoutCtrl', function ($window, $state, $location, storageService, $scope) {
        console.log('ok');
        $scope.deconnexion = 'ok';
        storageService.delStorage('data');
        storageService.delStorage('email');
        storageService.delStorage('isAuth');
        storageService.delStorage('token');

        // $location.path('/tab/login');
        $state.go('mLog.login');
    });