'use strict';

/**
 * @ngdoc function
 * @name sprint8App.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the sprint8App
 */
angular.module('sprint8App')
  .controller('ListCtrl', function ($scope, StorageService) {
    $scope.data = StorageService.data;
  });
