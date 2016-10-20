angular.module('starter.controllers.DashboardCtrl', [])
  .controller('DashboardCtrl', function ($state, $scope, dashboardService, userFactory) {
    $scope.isAuth = userFactory.isAuth;
    $scope.data = userFactory.data;
    if($scope.isAuth != true){
      
    }else{
      $state.go('tab.login');
    }
  });