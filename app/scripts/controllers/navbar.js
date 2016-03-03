'use strict';

angular.module('sprint8App')
  .controller('NavbarCtrl', function ($scope) {
    $scope.currentView = '';
    $scope.changeViewVariable = function () {
      if ($scope.currentView == '') {
        $scope.currentView = 'list';
      } else {
        $scope.currentView = '';
      }
      console.log($scope.currentView);
    };

  });
