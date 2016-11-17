angular.module('starter.controllers.DashboardCtrl', ['ngSails'])
  .controller('DashboardCtrl', function ($http, $state, $scope, $stateParams, $sails, cameraService, userService, storageService) {

    $scope.dataStored = storageService.getStorage('data');

    if ($scope.dataStored == "") {
        $state.reload();
    }
    else {
        $scope.user = JSON.parse($scope.dataStored);
        var userid = $scope.user.user.id;

        var data = cameraService.getAll(userid);
        data.then(function (response) {

        $scope.cameras = response;
        
          for(i = 0; i < $scope.cameras.length; i++){
            
            var isOwner;
            var userId = $scope.cameras[i].user.id;
            var cameraId = $scope.cameras[i].camera.owner;
            var cameraSwitch = $scope.cameras[i].camera.switchOn;

            // console.log($scope.cameras[i].camera);

            // display admin settings button
            if(userId == cameraId){
              $scope.cameras[i].isOwner = true;
            }else{
              $scope.cameras[i].isOwner = false;
            }

            if(cameraSwitch == true){
              $scope.cameras[i].color = "green";
            }else{
              $scope.cameras[i].color = "red";
            }

            // console.log(cameraSwitch + ' ' + $scope.class);

            $scope.isOwner = $scope.cameras[i].isOwner;
          }

          return $scope.cameras;
        });
    }

  $sails.on('camera', function (message) {
      console.log(message);
      var messageId = message.data[0].id;
      var i =0;
      for(key in $scope.cameras) {
            if($scope.cameras.hasOwnProperty(key)) {
              if($scope.cameras[i].camera.id == messageId)
              {
                  switch(message.verb){
                    case "updated" : 
                      $scope.cameras[i].camera =  message.data[0];

                      if($scope.cameras[i].camera.switchOn == true){
                          $scope.cameras[i].color = "green";
                        }else{
                          $scope.cameras[i].color = "red";
                        }
                    break;
                    case "created" :
                    // console.log(message);
                    //   $scope.cameras.push(message.data[0]);
                    break;
                    case "deleted" :
                    break;
                }
              }
                i++;
            }
        }
    });

    $scope.addCamera = function(){
      $state.go('tab.addCamera');
    }

    $scope.openSettings = function (cameraid) {
        $state.go('tab.camera-settings', { camid: cameraid });
    }
});