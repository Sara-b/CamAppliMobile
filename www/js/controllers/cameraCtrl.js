angular.module('starter.controllers.CameraCtrl', ['ngSails'])
  .controller('CameraCtrl', function($location, $state, $scope, $stateParams, cameraService, logService, storageService, $sails){
      
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
