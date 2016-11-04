angular.module('starter.controllers.CameraCtrl', [])
  .controller('CameraCtrl', function($state, $scope, $stateParams, cameraService){
      
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
        console.log($scope.camera);
    });

    if (!io.socket.alreadyListeningToCamera) {
      io.socket.alreadyListeningToCamera = true;
      io.socket.on('camera', function onServerSentEvent (msg) {
        
        console.log("event");
        console.log(msg);
        // Let's see what the server has to say...
        switch(msg.verb) {

          case 'updated':
            $scope.camera.push(msg.data); // (add the new order to the DOM)
            $scope.$apply();              // (re-render)
            break;

          default: return; // ignore any unrecognized messages
        }
      });
    }
    

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
