angular.module('starter.controllers.UserRolesCtrl', [])
  .controller('UserRolesCtrl', function ($http, $state, $scope, $stateParams, storageService, roleService) {
      console.log('ok');


      roleService.getRoles()
      .then(function (response) {
          $scope.roles = response.data;
          return $scope.roles;
      });

      roleService.getUcrById($stateParams.ucrid)
      .then(function (response) {
          $scope.ucr = response.data;
          return $scope.ucr;
      });



      $scope.updateRole = function (roleid, response) {
          roleService.updateRole($scope.ucr.id, roleid)
              .then(function (response) {
                  if (response.status == 200) {
                      console.log($scope.ucr);
                      $state.go('tab.camera-settings', { camid: $scope.camera.id });
                  } else {
                      $scope.message = 'Une erreur est survenue';
                      return $scope.message;
                  }
              },
              function (err) {
                  return err;
              })
      }

  });