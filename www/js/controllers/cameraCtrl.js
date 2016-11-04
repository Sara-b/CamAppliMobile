angular.module('starter.controllers.CameraCtrl', ['ngSails'])
  .controller('CameraCtrl', function($state, $scope, $stateParams, cameraService,$sails){
      
    camera = cameraService.get($stateParams.id);

    $scope.data = "";

    camera.then(function(result){
        $scope.data = result.data;
        $scope.camera = {
            id: $scope.data.id,
            name: $scope.data.name,
            switchOn: $scope.data.switchOn,
            owner: $scope.data.owner
        };
    });
    $sails.get('http://127.0.0.1:1337/camera/3')
      .success(function (data, status, headers, jwr) {
       console.log (data);
       console.log (jwr);
       console.log (status);
       
       
      })
      .error(function (data, status, headers, jwr) {
        alert('Houston, we got a problem!');
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
    
    return $scope.camera;

  });
