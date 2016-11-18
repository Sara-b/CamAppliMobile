angular.module('starter.controllers.UserRolesCtrl', ['ngSails'])
    .controller('UserRolesCtrl', function ($http, $state, $scope, $sails, $stateParams, storageService, roleService) {
        console.log('ok');


        roleService.getRoles()
            .then(function (response) {
                $scope.roles = response;
                return $scope.roles;
            });

        roleService.getUcrById($stateParams.ucrid)
            .then(function (response) {
                $scope.ucr = response;
                return $scope.ucr;
            });


        $scope.updateRole = function (roleid, response) {
            roleService.updateRole($scope.ucr.id, roleid)
                .then(function (response) {
                        if (response.status == 200) {
                            console.log($scope.ucr);
                            window.location.reload(window.history.back());
                        } else {
                            $scope.message = 'Une erreur est survenue';
                            return $scope.message;
                        }
                    },
                    function (err) {
                        return err;
                    })
        }

        $sails.on("usercamerarole", function (message) {
            switch (message.verb) {
                case "updated" :
                    $scope.ucr.role = message.data.role
                    break;
            }
        });

    });