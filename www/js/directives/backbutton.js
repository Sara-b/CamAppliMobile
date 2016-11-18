angular.module('starter.directives.backButton', [])
  .directive('backButton', function(){
    return {
      template: '<div class="bar bar-footer bar-dark" onclick="window.history.back()"><div class="title">Retour</div></div>'
    }
  });