angular.module('starter.controllers.CameraCtrl', ['ngSails'])
    .controller('CameraCtrl', function ($state, $scope, $stateParams, cameraService, $sails) {

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


        $scope.switch = function () {
            console.log("switch");
            cameraService.update($scope.camera);
        };

        $scope.turn = function (response) {
            console.log("turn");
            socket.emit('changeAngle', $scope.camera.angle);
            console.log($scope.camera.angle);
            socket.on('returnAng', function (ang) {
                console.log(ang);
            });
        };


    });
