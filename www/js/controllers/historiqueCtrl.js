angular.module('starter.controllers.HistoriqueCtrl', ['ngSails'])
    .controller('HistoriqueCtrl', function ($scope, $stateParams, logService, $sails) {
        console.log('ok');

        var camId = $stateParams.camid;

        $scope.logs = "";
        $scope.users = {};


        $scope.query = logService.getByCamera(camId)
            .then(function (response) {
                $scope.logs = response;
            });

        $sails.on("log", function (message) {
            console.log(message);
                console.log($scope.logs);
            switch(message.verb){
                case "created":
                console.log(message.data);
                    $scope.logs.push(message.data);
                break;
            }
        });

    });