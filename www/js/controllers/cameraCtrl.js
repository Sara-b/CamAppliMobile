angular.module('starter.controllers.CameraCtrl', ['ngSails'])
    .controller('CameraCtrl', function ($location, $state, $scope, $stateParams, cameraService, logService, storageService, $sails) {

        camera = cameraService.get($stateParams.id);

        $scope.data = "";
        var socket = io("http://" + document.location.hostname + ":3000");


        $scope.camera_turn = false;
        camera.then(function (result) {
            console.log('camera.result', result);
            $scope.data = result;
            $scope.camera = result;
            $scope.camera.angle = 90;
            $scope.camera_turn = true;
        });

        $sails.on("camera", function (message) {
            switch (message.verb) {
                case "updated" :
                    $scope.camera = message.data[0]
                    break;
            }
            console.log('youpi')
            console.log(message)
        });

        $scope.turn = function (response) {
            socket.emit('changeAngle', $scope.camera.angle);
            socket.on('returnAng', function (ang) {
                console.log(ang);
            });
        };

        $scope.switch = function () {
            console.log("switch");
            cameraService.update($scope.camera);
            console.log($scope.camera.switchOn);

            var etat;
            console.log($scope.camera.switchOn);

            if ($scope.camera.switchOn == false) {
                etat = "Eteinds";
            } else {
                etat = "Allume";
            }

            var logData = {
                "user": JSON.parse(storageService.getStorage('data')).user.id,
                "camera": $stateParams.id,
                "event": etat + " la caméra"
            };

            console.log(logData);
            logService.add(logData)
                .then(function (response) {
                    console.log(response.data);
                });
        };

        $scope.$watch(function () {
            return $location.path();
        }, function (url) {
            var model = new RegExp('\/tab\/camera\/([0-9]{1,2})');
            if (!url.match(model)) {
                logData = {
                    "user": JSON.parse(storageService.getStorage('data')).user.id,
                    "camera": $stateParams.id,
                    "event": "Ferme la caméra"
                };
                logService.add(logData)
                    .then(function (response) {
                        console.log(response.data);
                    });
            }
        });

        return $scope.camera;
    });