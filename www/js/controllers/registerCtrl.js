angular.module('starter.controllers.RegisterCtrl', [])
  .controller('RegisterCtrl', function ($scope, registerService) {
    $scope.message = '';
    $scope.user = { lastname: '', firstname: '', password: '', email: '', username: '' };
    console.log('ok');

    $scope.register = function (response) {
      console.log($scope.user);
      console.log(response);
      registerService.registration($scope.user)
        .then(function (response) {
          console.log($scope.user);
          console.log(response);
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