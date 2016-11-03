angular.module('starter.controllers.ProfilCtrl', [])
  .controller('ProfilCtrl', function ($http, $state, $scope, $stateParams, userService, storageService) {
    
    storage = JSON.parse(storageService.getStorage('data'));
    console.log(storage.user.id);
    user = userService.get(storage.user.id);

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
    }, function(err){
      console.log(err);
      return err;
    });

    
    //update user
    $scope.update = function (response){
      userService.update($scope.user).then(function (response) {
        $scope.user.password = "";
        console.log($scope.user);
        console.log(response.data);
        data = '{"token":"' + storageService.getStorage('token') + '","user":' + JSON.stringify(response.data[0]) + '}';
        console.log(data);
        storageService.updateStorage('data', data);
        console.log(storageService.getStorage('data'));
      });
    }

    return $scope.user;
});
