angular.module('app').controller('mainMenuCtrl', function($scope, $location) {

  $.material.init();

    $scope.isActive = function(viewLocation) {
      return viewLocation === $location.path();
    };

});

