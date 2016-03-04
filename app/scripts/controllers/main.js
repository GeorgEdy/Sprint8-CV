'use strict';

(function () {
  var app = angular.module('sprint8App');

  //controllers
  app.controller('MainCtrl', function ($scope, StorageService) {
    //$scope.currDocIndex = StorageService.currentDocIndex;
    $scope.data = StorageService.data[StorageService.currentDocIndex];
    $scope.showButtons = {work: false, education: false, languages: false, proSkills: false};
    $scope.changeDocument = function (index) {
      $scope.data = StorageService.data[index];
      alert(StorageService.currentDocIndex);
    };
    $scope.deleteField = function (name, event, index) {
      if (name === 'workingExperience') {

        $scope.data.workingExperience.splice(index, 1);
      } else if (name === 'education') {
        $scope.data.education.splice(index, 1);
      } else {
        $scope.data.languages.splice(index, 1);
      }
    };

    $scope.addField = function (name) {
      if (name === 'workingExperience') {
        $scope.data.workingExperience.push({
          position: '',
          company: '',
          description: ''
        })
      } else if (name === 'education') {
        $scope.data.education.push({
          degree: '',
          school: '',
          description: ''
        })
      } else {
        $scope.data.languages.push({
          name: '',
          understanding: '',
          speaking: '',
          writing: ''
        })
      }
    };

  });

  app.directive('datePicker', function () {
    return {
      replace: true,
      //scope: {
      //  dateValue: '@dateValue'
      //},
      link: function (scope, element, attr) {
      }
    };
  });

  app.filter('dateFilter', function () {
    return function (input, toPresent) {
      return toPresent ? "Present" : moment(input).format('DD.MM.YYYY');
    }
  });

})
();
