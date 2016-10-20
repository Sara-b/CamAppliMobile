angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('RegisterCtrl', function($scope, registerService) {
  $scope.user = {
    lastname :'',
    firstname : '',
    password :'',
    email : '',
    username : ''
  }

  $scope.register = function(response){
    console.log($scope.user);
    registerService.registration($scope.user)
    .then(function(response){
      console.log(response);
    });
  }
})

.controller('LoginCtrl', function($scope, loginService){
  $scope.user = {
    email: '',
    password : ''
  }
  $scope.login = function(response){

    loginService.signin($scope.user)
    .then(function(response){
      console.log(response);
      console.log('connecté');
    });
  }
});