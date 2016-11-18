angular.module('starter.controllers.CameraSettingsCtrl', ['ngSails'])
  .controller('CameraSettingsCtrl', function($http, $state, $ionicPopup, $scope, cameraService, $stateParams, storageService, roleService, $sails){
      console.log('ok');

      cameraService.get($stateParams.camid)
      .then(function(response){
          $scope.camera = response;
          return $scope.camera;
      });

      roleService.get($stateParams.camid)
      .then(function (response) {
          $scope.users = response;
          return $scope.users;
      });



      $scope.updateName = function (response) {
          cameraService.updateCam($scope.camera)
            .then(function (response) {
                if (response.status == 200) {
                    console.log($scope.user);
                    $state.go('tab.camera-settings', { camid: $scope.camera.id });
                } else {
                    $scope.message = 'Une erreur est survenue';
                    return $scope.message;
                }
            },
            function(err){
                return err;
            })
      }

      $scope.navigateAddUser = function () {
          $state.go('tab.addUserCamera', { camid: $scope.camera.id });
      }

      $scope.navigateUserRole = function (ucrid, response) {
          $state.go('tab.userRole', { ucrid: ucrid });
      }

      $sails.on('usercamerarole', function (message) {
        console.log($scope.users);
        console.log(message);
        var messageId = message.data.id;
            switch(message.verb){
            case "updated" : 
            var i=0;
            for(key in $scope.users) {
                if($scope.users.hasOwnProperty(key)) {
                    if($scope.users[i].id == messageId)
                    {
                        $scope.users[i] =  message.data;
                    }
                }
                i++
            }
            break;
            case "created" :
                console.log(message);
                $scope.users.push(message.data);
            break;
            case "destroyed" :
            break;
            }
      });

      $scope.showConfirm = function (ucrid) {
        var confirmPopup = $ionicPopup.confirm({
            title: 'Suppression',
            template: 'Etes vou s�r de vouloir supprimer cet utilisateur ?'
        });

        confirmPopup.then(function (res) {
            if (res) {
                console.log('You are sure');
                roleService.delete(ucrid);
            } else {
                console.log('You are not sure');
            }
        });
    };
  });