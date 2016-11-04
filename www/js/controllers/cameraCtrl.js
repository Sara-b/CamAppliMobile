angular.module('starter.controllers.CameraCtrl', ['ngSails'])
  .controller('CameraCtrl', function($state, $scope, $stateParams, cameraService,$sails){
      
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
    
    return $scope.camera;

  });
