// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', [
  'ionic',
  'ngResource',
  'ngRoute',
  'starter.controllers.LoginCtrl',
  'starter.controllers.RegisterCtrl',
  'starter.controllers.DashboardCtrl',
  'starter.controllers.AddCameraCtrl',
  'starter.controllers.CameraSettingsCtrl',
  'starter.controllers.CameraCtrl',
  'starter.controllers.ProfilCtrl',
  'starter.controllers.LogoutCtrl',
  'starter.controllers.UserRolesCtrl',
  'starter.controllers.HistoriqueCtrl',
  'starter.controllers.AddUserCtrl',

  'starter.services.userService',
  'starter.services.cameraService',
  'starter.services.storageService',
  'starter.services.logService',
  'starter.services.roleService'
  ])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

})
.config(['$sailsProvider', function ($sailsProvider) {
    $sailsProvider.url = 'http://localhost:1337';
}])
.config(function($stateProvider, $urlRouterProvider) {
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  //setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  .state('mLog', {
    url: '/mLog',
    abstract: true,
    templateUrl: 'templates/mLog.html'
  })

  // Each tab has its own nav history stack:

  .state('mLog.register', {
    url: '/register',
    views: {
      'mLog-register': {
        templateUrl: 'templates/tab-register.html',
        controller: 'RegisterCtrl'
      }
    }
    })
  .state('mLog.login', {
    url: '/login',
    views: {
      'mLog-login': {
        templateUrl: 'templates/tab-login.html',
        controller: 'LoginCtrl'
      }
    }
    })
  .state('tab.about', {
    url: '/about',
    views: {
      'content': {
        templateUrl: 'templates/about.html'
      }
    }
    })
  .state('tab.logout', {
    url: '/logout',
    views: {
      'content': {
        templateUrl: 'templates/tab-logout.html',
        controller: 'LogoutCtrl'
      }
    }
    })
  .state('tab.dashboard', {
    url: '/dashboard',
    views: {
      'content': {
        templateUrl: 'templates/tab-dashboard.html',
        controller: 'DashboardCtrl',
      }
    }
    })
  .state('tab.addCamera', {
    url: '/addCamera',
    views: {
        'content': {
          templateUrl: 'templates/tab-addCamera.html',
          controller: 'AddCameraCtrl'
        }
      }
    })
  .state('tab.profil', {
    url: '/profil',
    views: {
      'content': {
        templateUrl: 'templates/tab-profil.html',
        controller: 'ProfilCtrl'
      }
    }
    })
  .state('tab.camera', {
    url: '/camera/:id',
    views: {
      'content': {
        templateUrl: 'templates/tab-camera.html',
        controller: 'CameraCtrl'
      }
    }
    })
  .state('tab.camera-settings', {
    url: '/camera/:camid/settings',
    views: {
        'content': {
            templateUrl: 'templates/tab-camera-settings.html',
            controller: 'CameraSettingsCtrl'
        }
    }
    })
  .state('tab.historique',{
    url: '/camera/:camid/historique',
    views: {
      'content': {
        templateUrl: 'templates/tab-historique.html',
        controller: 'HistoriqueCtrl'
      }
    }
  })
  .state('tab.userRole', {
    url: '/camera/:ucrid/role',
      views: {
        'content': {
            templateUrl: 'templates/tab-userRole.html',
            controller: 'UserRolesCtrl'
          }
        }
  })
  .state('tab.addUserCamera', {
    url: '/camera/:camid/addUsers/users',
    views: {
        'content': {
            templateUrl: 'templates/tab-addUser.html',
            controller: 'AddUserCtrl'
        }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/mLog/login');

})

  .factory('Interceptor', function($window){
    var token = window.sessionStorage.getItem('token');
    return {
      response: function(config){
        config.headers['Authorization'] = 'JWT ' + token;
        return config;
      }
    }
  });