angular.module('starter.controllers.DashboardCtrl', ['ngSails'])
    .controller('DashboardCtrl', function ($http, $state, $scope, $stateParams, $sails, cameraService, userService, storageService, logService) {

        $scope.dataStored = storageService.getStorage('data');
        var userid = "";
        
        if ($scope.dataStored == "") {
            $state.reload();
        }
        else {
            $scope.user = JSON.parse($scope.dataStored);
            userid = $scope.user.user.id;
            var data = cameraService.getAll(userid);
            data.then(function (response) {

                var cameras = [];
                var i = 0;

                for (key in response) {
                    if (response.hasOwnProperty(key)) {
                        cameras[i] = response[i].camera;
                    }
                    i++
                }

                $scope.cameras = cameras;

                for (i = 0; i < $scope.cameras.length; i++) {
                    var isOwner;
                    var cameraOwnerId = $scope.cameras[i].owner;
                    var cameraSwitch = $scope.cameras[i].switchOn;

                    // display admin settings button

                    if (userid == cameraOwnerId) {
                        $scope.cameras[i].isOwner = true;
                    } else {
                        $scope.cameras[i].isOwner = false;
                    }

                    //display color settings
                    if (cameraSwitch == true) {
                        $scope.cameras[i].color = "green";
                    } else {
                        $scope.cameras[i].color = "red";
                    }

                    $scope.isOwner = $scope.cameras[i].isOwner;
                }
                return $scope.cameras;

            });
        }

        $sails.on('camera', function (message) {
            console.log(message);

            switch (message.verb) {
                case "updated" :
                    var i = 0;
                    var messageId = message.data[0].id;
                    for (key in $scope.cameras) {
                        if ($scope.cameras.hasOwnProperty(key)) {
                            if ($scope.cameras[i].id == messageId) {
                                $scope.cameras[i] = message.data[0];
                                //mettre à jour la couleur du switch apres un update
                                if ($scope.cameras[i].switchOn == true) {
                                    $scope.cameras[i].color = "green";
                                }
                                else {
                                    $scope.cameras[i].color = "red";
                                }
                                //mettre à jour l'icone settings
                                if ($scope.cameras[i].owner == userid) {
                                    $scope.cameras[i].isOwner = true;
                                }
                                else {
                                    $scope.cameras[i].isOwner = false;
                                }
                            }
                        }
                        i++;
                    }
            break;
            case "created" :
              var newCam = message.data;
              //mettre à jour la couleur du switch apres un update
              if(newCam.switchOn == true){
                  newCam.color = "green";
              } 
              else{
                  newCam.color = "red";
              }
              //mettre à jour l'icone settings
              if(newCam.owner == userid){
                  newCam.isOwner = true;
              } 
              else{
                  newCam.isOwner = false;
              }
              $scope.cameras.push(newCam);              
            break;
            case "destroyed" :
            console.log("destoy");
                var i=0;
                var messageId = message.id;
                for(key in $scope.cameras) {
                    if($scope.cameras.hasOwnProperty(key)) {
                        if($scope.cameras[i].id == messageId)
                        {
                            $scope.cameras.splice(i, 1);
                        }
                    }
                    i++
                 }
            break;
        }
    });

        $scope.addCamera = function () {
            $state.go('tab.addCamera');
        }

        $scope.openCamera = function (camid) {
            logData = {
                "user": userid,
                "camera": camid,
                "event": "Ouvre la caméra"
            };
            logService.add(logData)
                .then(function (response) {
                    console.log(response.data);
                });
        }

        $scope.openSettings = function (cameraid) {
            $state.go('tab.camera-settings', {camid: cameraid});
        }
    });