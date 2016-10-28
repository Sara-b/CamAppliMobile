angular.module('starter.controllers.DashboardCtrl', [])
  .controller('DashboardCtrl', function ($http, $state, $scope, $stateParams, userFactory, CameraService) {
    $scope.user = JSON.parse(userFactory.data);
    $scope.userid = $scope.user.user.id;

    $stateParams.id = $scope.userid;

    $scope.data = $http.get('http://127.0.0.1:1337/usercamerarole/'+ $stateParams.id +'/cameras', {
      method: 'GET',
      headers: {
        "Content-Type": 'application/x-www-form-urlencoded',
        "Authorization": 'JWT ' + userFactory.token
      },
      data: {userid : $stateParams.id}
    })
    .then(function(response){
      $scope.cameras = response.data;

      return $scope.cameras;
    });


    $scope.openSettings = function (cameraid) {
        //console.log('ok');
        $state.transitionTo('tab.camera-settings');
        //  }, function (err) {
        //      console.log(err);
        //  });
    }
});