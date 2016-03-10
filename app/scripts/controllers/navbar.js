'use strict';

angular.module('sprint8App')
  .controller('NavbarCtrl', function ($scope, StorageService) {
    $scope.currentView = '';
    $scope.currentDocIndex = StorageService.currentDocIndex;
    $scope.cvName = StorageService.data[$scope.currentDocIndex].cvName;

    $scope.$watch(function () {
      return StorageService.currentDocIndex;
    }, function (newValue) {
      $scope.cvName = StorageService.data[newValue].cvName;
    });

    $scope.$watch(function () {
      return $scope.cvName;
    }, function (newValue) {
      StorageService.data[StorageService.currentDocIndex].cvName = newValue;
    });

    $scope.changeViewVariable = function () {
      if ($scope.currentView == '') {
        $scope.currentView = 'list';
      } else {
        var dataLength = StorageService.data.length;
        $scope.currentView = dataLength ? '' : 'list';
      }
    };

  });
