angular.module('starter.controllers.AddCameraCtrl', [])
    .controller('AddCameraCtrl', function ($scope, cameraService, storageService) {
        userData = JSON.parse(storageService.getStorage('data'));
        userid = userData.user.id;
        $scope.camera = {name: '', uid: '', userid: userid};

        $scope.addCamera = function (response) {
            cameraService.addCamera($scope.camera)
                .then(function (response) {
                    console.log(response);
                    window.history.back();
                });
        }
    });