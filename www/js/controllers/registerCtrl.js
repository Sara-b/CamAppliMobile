angular.module('starter.controllers.RegisterCtrl', [])
  .controller('RegisterCtrl', function ($scope, userService) {
    $scope.message = '';
    
    $scope.user = { lastname: '', firstname: '', password: '', email: '', username: '' };

    $scope.register = function (response) {
      userService.registration($scope.user)
        .then(function (response) {
          if(response.status == 201 || response.status == 200){
            $scope.message = 'Votre compte à bien été enregistré';
            return $scope.message;
          }else{
            $scope.message = 'Une erreur est survenue';
          }
        }),function(err, response){
          console.log(response);
          console.log(err);
        };
    };
  });