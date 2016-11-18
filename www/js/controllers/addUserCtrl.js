angular.module('starter.controllers.AddUserCtrl', [])
  .controller('AddUserCtrl', function ($scope, $ionicPopup, $state, roleService, storageService, $stateParams, userService) {

      $scope.camid = $stateParams.camid
      
      userService.getAllUsers()
      .then(function (response) {
          $scope.users = response.data;
          return $scope.users;
      });

      roleService.getRoles()
      .then(function (response) {
          $scope.roles = response;
          return $scope.roles;
      });

      roleService.get($scope.camid)
      .then(function (response) {
          $scope.cameraUsers = response;
          return $scope.cameraUsers;
      });

      $scope.data = {
          selectUser : -1,
          selectRole : -1
      }

      $scope.showAlert = function ($message) {
          var alertPopup = $ionicPopup.alert({
              title: 'Ajout utilisateur',
              template: $message
          });
      }

      $scope.addUser = function () {
          var userExist = false;
          var i=0;
          for(key in $scope.cameraUsers) {
            if($scope.cameraUsers.hasOwnProperty(key)) {
                if ($scope.cameraUsers[i].user.id == $scope.data.selectUser) {
                  userExist = true;
                  break;
              }
            }
            i++
        }

          if ($scope.data.selectUser == -1 || $scope.data.selectRole == -1) {
              $scope.showAlert("Vous devez sélectionner un utilisateur et un rôle");
          }
          else if (userExist) {
              $scope.showAlert("Cet utilisateur a déjà été ajouté à la camera");
          }
          else {
              roleService.addUCR($scope.camid, $scope.data.selectUser, $scope.data.selectRole)
                .then(function (response) {
                    console.log(response);
                });
              window.location.reload(window.history.back());
          }
      }
  });