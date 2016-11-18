angular.module('starter.controllers.CameraSettingsCtrl', ['ngSails'])
    .controller('CameraSettingsCtrl', function ($http, $state, $ionicPopup, $scope, cameraService, $stateParams, storageService, roleService, $sails) {
        console.log('ok');

        cameraService.get($stateParams.camid)
        .then(function(response){
          $scope.camera = response;
          if ($scope.camera.switchOn == true) {
              $scope.switchOn = "AllumÃ©";
          }
          else {
              $scope.switchOn = "Eteint";
          }
          return $scope;
      });
       
        roleService.get($stateParams.camid)
        .then(function (response) {
            $scope.users = response;
            return $scope.users;
        });


        $scope.navigateAddUser = function () {
            $state.go('tab.addUserCamera', { camid: $scope.camera.id });
        };

        $scope.navigateUserRole = function (ucrid, response) {
            $state.go('tab.userRole', { ucrid: ucrid });
        };

        $scope.navigateHistorique = function (response) {
            $state.go('tab.historique', { camid: $scope.camera.id });
        };


        $sails.on('usercamerarole', function (message) {
            switch (message.verb) {
                case "updated" :
                    var messageId = message.data.id;
                    var i=0;
                    for (key in $scope.users) {
                        if ($scope.users.hasOwnProperty(key)) {
                            if ($scope.users[i].id == messageId) {
                                $scope.users[i] = message.data;
                            }
                        }
                        i++
                    }
                break;
                case "created" :
                    $scope.users.push(message.data);
                break;
                case "destroyed" :
                    var i=0;
                    var messageId = message.id;
                    for(key in $scope.users) {
                        if($scope.users.hasOwnProperty(key)) {
                            if($scope.users[i].id == messageId)
                            {
                                $scope.users.splice(i, 1);
                            }
                        }
                        i++
                    }
                break;
                }
        });

        $scope.updateName = function (response) {
            cameraService.updateCam($scope.camera)
                .then(function (response) {
                    if (response.status == 200) {
                        console.log($scope.user);
                        $state.go('tab.camera-settings', { camid: $scope.camera.id });
                        $scope.showAlert("Renomage", "Le renommage de la caméra s'est effectuée avec succès");
                    } else {
                        $scope.message = 'Une erreur est survenue';
                        $scope.showAlert("Renomage", $scope.message);
                        return $scope.message;
                    }
                },
                    function (err) {
                        return err;
                    })
        };


        $scope.showConfirm = function (ucrid) {
            var confirmPopup = $ionicPopup.confirm({
            title: 'Suppression',
            template: "ÃŠtes vous sÃ»r de vouloir supprimer l'utilisateur sur cette camÃ©ra ?"
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

        $scope.showAlert = function ($titre, $message) {
          var alertPopup = $ionicPopup.alert({
              title: $titre,
              template: $message
          });
      };
    });