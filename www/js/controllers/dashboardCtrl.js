angular.module('starter.controllers.DashboardCtrl', ['ngSails'])
  .controller('DashboardCtrl', function ($http, $state, $scope, $stateParams, $sails, cameraService, userService, storageService) {

    $scope.dataStored = storageService.getStorage('data');
    var userid ="";

    if ($scope.dataStored == "") {
        $state.reload();
    }
    else {
        $scope.user = JSON.parse($scope.dataStored);
        userid = $scope.user.user.id;

        var data = cameraService.getAll(userid);
        data.then(function (response) {

        var cameras = [];
        var i = 0;

        for(key in response) {
            if(response.hasOwnProperty(key)) {
                cameras[i] = response[i].camera;
            }
            i++
        }

        $scope.cameras = cameras;
        
          for(i = 0; i < $scope.cameras.length; i++){
            var isOwner;
            var cameraOwnerId = $scope.cameras[i].owner;
            var cameraSwitch = $scope.cameras[i].switchOn;

            // console.log($scope.cameras[i].camera);

            // display admin settings button
            
            if(userid == cameraOwnerId){
              console.log("true");
              $scope.cameras[i].isOwner = true;
            }else{
              $scope.cameras[i].isOwner = false;
              console.log("false");
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

      switch(message.verb){
      case "updated" : 
        var i =0;
        var messageId = message.data[0].id;
          for(key in $scope.cameras) {
              if($scope.cameras.hasOwnProperty(key)) {
                  if($scope.cameras[i].id == messageId)
                  {
                    $scope.cameras[i] =  message.data[0];
                    //mettre à jour la couleur du switch apres un update
                    if($scope.cameras[i].switchOn == true){
                        $scope.cameras[i].color = "green";
                    } 
                    else{
                        $scope.cameras[i].color = "red";
                    }
                    //mettre à jour l'icone settings
                    if($scope.cameras[i].owner == userid){
                        $scope.cameras[i].isOwner = true;
                    } 
                    else{
                        $scope.cameras[i].isOwner = false;
                    }
                  }
              }
                i++;
            }
            break;
            case "created" :
              var newCam = message.data;
              //mettre à jour la couleur du switch apres un update
              if(newCam.switchOn == true){
                  newCam.color = "green";
              } 
              else{
                  newCam.color = "red";
              }
              //mettre à jour l'icone settings
              if(newCam.owner == userid){
                  newCam.isOwner = true;
              } 
              else{
                  newCam.isOwner = false;
              }
              $scope.cameras.push(newCam);              
            break;
            case "deleted" :
            break;
        }
    });

    $scope.addCamera = function(){
      $state.go('tab.addCamera');
    }

    $scope.openSettings = function (cameraid) {
        $state.go('tab.camera-settings', { camid: cameraid });
    }
});