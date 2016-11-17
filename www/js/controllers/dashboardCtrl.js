angular.module('starter.controllers.DashboardCtrl', [])
  .controller('DashboardCtrl', function ($http, $state, $scope, $stateParams, cameraService, userService, storageService, logService) {

    $scope.dataStored = storageService.getStorage('data');

    if ($scope.dataStored == "") {
        $state.reload();
    }
    else {
      $scope.user = JSON.parse($scope.dataStored);
      var userid = $scope.user.user.id;

      var data = cameraService.getAll(userid);
      data.then(function (response) {

<<<<<<< HEAD
        $scope.cameras = response.data;
        for(i = 0; i < $scope.cameras.length; i++){
          var isOwner;
          var userId = $scope.cameras[i].user.id;
          var cameraId = $scope.cameras[i].camera.owner;
          var cameraSwitch = $scope.cameras[i].camera.switchOn;

          // display admin settings button
          if(userId == cameraId){
            $scope.cameras[i].isOwner = true;
          }else{
            $scope.cameras[i].isOwner = false;
          }
=======
        $scope.cameras = response;
>>>>>>> d7c5cb27152074dda040ea4955ba21e44e2c75a9

          // display on/off icon
          if(cameraSwitch == true){
            $scope.cameras[i].color = "green";
          }else{
            $scope.cameras[i].color = "red";
          }

          $scope.isOwner = $scope.cameras[i].isOwner;

          var logData = {"user": "","camera": "","event": "Ouvre la caméra"};

          $scope.openCamera = function(camid){
            logData = {
              "user": userId,
              "camera": camid,
              "event": "Ouvre la caméra"
            };
            logService.add(logData)
            .then(function(response){
              console.log(response.data);
            });
          }

        }



          return $scope.cameras;
      });

      $scope.addCamera = function(){
        $state.go('tab.addCamera');
      }


    }

    

    $scope.openSettings = function (cameraid) {
        $state.go('tab.camera-settings', { camid: cameraid });
    }
});