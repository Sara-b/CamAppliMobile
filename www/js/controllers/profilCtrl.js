angular.module('starter.controllers.ProfilCtrl', [])
  .controller('ProfilCtrl', function ($http, $state, $scope, $stateParams, userFactory) {
    
    $scope.user = JSON.parse(userFactory.data);

    //update user
    $scope.update = function (response){
        console.log('update');
        profilService.update($scope.user);
        console.log('ok');
    }

    return $scope.user;
    });
