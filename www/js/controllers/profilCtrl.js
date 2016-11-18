angular.module('starter.controllers.ProfilCtrl', [])
    .controller('ProfilCtrl', function ($http, $ionicPopup, $state, $scope, $stateParams, userService, storageService) {

        storage = JSON.parse(storageService.getStorage('data'));
        console.log(storage.user.id);
        user = userService.get(storage.user.id);

        $scope.data = "";

        user.then(function (result) {
            console.log(result);
            $scope.data = result;
            console.log($scope);
            $scope.user = {
                id: $scope.data.id,
                firstname: $scope.data.firstname,
                lastname: $scope.data.lastname,
                email: $scope.data.email
            };
            console.log($scope.user);
        }, function (err) {
            console.log(err);
            return err;
        });


        //update user
        $scope.update = function (response) {
            userService.update($scope.user).then(function (response) {
                $scope.user.password = "";
                console.log($scope.user);
                console.log(response);
                data = '{"token":"' + storageService.getStorage('token') + '","user":' + JSON.stringify(response[0]) + '}';
                console.log(data);
                storageService.updateStorage('data', data);
                console.log(storageService.getStorage('data'));
            });
            $scope.showAlert("Modification du profil", "La modification du profil s'est effectuée avec succés")
        }

        $scope.showAlert = function ($titre, $message) {
            var alertPopup = $ionicPopup.alert({
                title: $titre,
                template: $message
            });
        };

        return $scope.user;
    });
