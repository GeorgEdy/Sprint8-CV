'use strict';

/**
 * @ngdoc function
 * @name sprint8App.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the sprint8App
 */
angular.module('sprint8App')
  .controller('ListCtrl', ['$scope', 'StorageService', '$location', function ($scope, StorageService, $location) {
    $scope.data = StorageService.data;
    $scope.changeDocument = function (index) {
      StorageService.currentDocIndex = index;
      $location.path('/');
    };

    $scope.createDocument = StorageService.createDocument;
    $scope.deleteDocument = function (index) {
      StorageService.deleteDocument(index);
      console.log(index);
    };
  }]);
