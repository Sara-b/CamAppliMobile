angular.module('starter.controllers.CameraCtrl', [])
  .controller('CameraCtrl', function($state, $scope, $stateParams, cameraService){
      
    camera = cameraService.get($stateParams.id);

    $scope.data = "";

    camera.then(function(result){
        console.log(result);
        $scope.data = result.data;
        console.log($scope.data);
        $scope.camera = {
            id: $scope.data.id,
            name: $scope.data.name,
            switchOn: true,
            owner: $scope.data.owner
        };
        console.log($scope.camera);
    });
    

    // var imageUrl= document.camimage.src;
    //       var random = new Date().getTime();
    //       var delay = 1;										
    //       var counter = 0;
    //       var buffer = new Image; 
    //       function DisplayImage() { 
    //         document.camimage.src = buffer.src; 
    //         LoadNextImage(); 
    //       } 

    //       function LoadBuffer() { 
    //         var trickname = imageUrl; 
    //         ++counter; 
    //         trickname += "?counter=" + (random + counter); 
    //         buffer.src = trickname; 
    //         buffer.onload = DisplayImage; 
    //         alert("hey");
    //       } 
    //       function LoadNextImage() { 
    //         $timeout(LoadBuffer(), 300*delay); 
    //       } 
    
    // LoadNextImage(); 
    
    return $scope.camera;

  });
