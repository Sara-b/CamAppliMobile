
angular.module('starter.controllers.CameraAdminCtrl', [])
    .controller('CameraAdminCtrl', function ($scope, $http, userFactory) {

        $scope.user = JSON.parse(userFactory.data);
        $stateParams = $scope.user.user.id;

        $scope.cameras = {};
        $scope.data = $http.get(
            'http://127.0.0.1:1337/camera/owner/'+ $stateParams,
            {
                headers: {
                    'Authorization': 'JWT ' + userFactory.token,
                }
            }
        ).then(function (req, res) {
            return $scope.cameras = res.data;

        });

    });