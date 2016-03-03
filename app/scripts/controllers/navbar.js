'use strict';

/**
 * @ngdoc function
 * @name sprint8App.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the sprint8App
 */
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
