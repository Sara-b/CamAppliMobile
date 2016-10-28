angular.module('starter.controllers.ProfilCtrl', [])

  .controller('ProfilCtrl', function ($http, $state, $scope, $stateParams, profilService, userFactory) {
    
    storage = JSON.parse(userFactory.data);
    console.log(storage.user.id);
    user = profilService.get(storage.user.id);

    $scope.data = "";

    user.then(function(result){
        console.log(result);
        $scope.data = result.data;
        console.log($scope.data);
        $scope.user = {
            id: $scope.data.id,
            firstname: $scope.data.firstname,
            lastname: $scope.data.lastname,
            email: $scope.data.email
        };
        console.log($scope.user);
    });

    
    //update user
    $scope.update = function (response){
        profilService.update($scope.user).then(function (response) {
            $scope.user.password = "";
            console.log($scope.user);
            console.log(response.data);
    });
        console.log('ok');
    }

    return $scope.user;
    });
