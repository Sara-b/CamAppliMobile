angular.module('starter.controllers.CameraCtrl', ['ngSails'])
  .controller('CameraCtrl', function($location, $state, $scope, $stateParams, cameraService, logService, storageService, $sails){
      
    camera = cameraService.get($stateParams.id);
    
    $scope.data = "";

    camera.then(function(result){
      console.log(result);
        $scope.data = result;
        $scope.camera = {
            id: $scope.data.id,
            name: $scope.data.name,
            switchOn: $scope.data.switchOn,
            owner: $scope.data.owner
        };
    });
    
     $sails.on("camera", function (message) {
       switch(message.verb){
          case "updated" : 
         $scope.camera =  message.data[0]
          break;
       }
      console.log('youpi')
      console.log(message)
    });


    $scope.switch = function(){
      console.log("switch");
      cameraService.update($scope.camera);
    }
    
    $scope.$watch(function(){
      return $location.path();
    }, function(url){
      var model = new RegExp('\/tab\/camera\/([0-9]{1,2})');
      if(!url.match(model)){
        logData = {
          "user": JSON.parse(storageService.getStorage('data')).user.id,
          "camera": $stateParams.id,
          "event": "Ferme la caméra"
        };
        logService.add(logData)
        .then(function(response){
          console.log(response.data);
        });
      }
    });

    return $scope.camera;
  });
