angular.module('starter.controllers.CameraSettingsCtrl', ['ngSails'])
    .controller('CameraSettingsCtrl', function ($http, $state, $ionicPopup, $scope, cameraService, $stateParams, storageService, roleService, $sails) {
        console.log('ok');

        cameraService.get($stateParams.camid)
        .then(function(response){
          $scope.camera = response;
          if ($scope.camera.switchOn == true) {
              $scope.switchOn = "Allumé";
          }
          else {
              $scope.switchOn = "Eteint";
          }

          return $scope;
      });
       
        roleService.get($stateParams.camid)
        .then(function (response) {
            $scope.users = response;
            for (var i = 0; i < $scope.users.length; i++) {
                $scope.users[i].isOwner = false;
                if ($scope.camera.owner.id == $scope.users[i].user.id) {
                    $scope.users[i].isOwner = true;
                }
            }
         
            return $scope;
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
                        $scope.showAlert("Renomage", "Le renommage de la caméra s'est effectuée avec succés");
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

        $scope.deleteCam = function ($titre, $message) {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Suppression caméra',
                template: "Voulez vous vraiment suppimer cette caméra ?"
            });

            confirmPopup.then(function (res) {
                if (res) {
                    console.log('You are sure' + $scope.camera.id);
                    cameraService.deleteCamera($scope.camera.id);
                    window.history.back();
                } else {
                    console.log('You are not sure');
                }
            });
        };

        $scope.deleteUser = function (ucrid) {
            var confirmPopup = $ionicPopup.confirm({
            title: 'Suppression utilisateur',
            template: "Voulez vous vraiment supprimer l'utilisateur sur cette caméra ?"
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