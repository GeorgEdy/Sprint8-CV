'use strict';

(function () {
  var app = angular.module('sprint8App');

  //controllers
  app.controller('MainCtrl', function ($scope, StorageService) {
    dragula([document.getElementById('test')]);
      $scope.currentDocIndex = StorageService.currentDocIndex;
      $scope.data = StorageService.data[$scope.currentDocIndex];
      $scope.showButtons = {work: false, education: false, languages: false, proSkills: false, picture: false};
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
          });
        } else if (name === 'education') {
          $scope.data.education.push({
            degree: '',
            school: '',
            description: ''
          });
        } else {
          $scope.data.languages.push({
            name: '',
            understanding: '',
            speaking: '',
            writing: ''
          });
        }
      };

      $scope.displayDeleteButton = function (type) {
        if (type === 'work') {
          return ($scope.data.workingExperience.length !== 1);
        } else if (type === 'education') {
          return ($scope.data.education.length !== 1);
        } else if (type === 'languages') {
          return ($scope.data.languages.length !== 1);
        }
      };

      $scope.imageUpload = function (event) {
        var files = event.target.files;
        var reader = new FileReader();
        reader.onload = $scope.imageIsLoaded;
        reader.readAsDataURL(files[0]);
      };

      $scope.imageIsLoaded = function (e) {
        $scope.$apply(function () {
          $scope.data.personalDetails.pictureSrc = e.target.result;
          console.log($scope.data.personalDetails);
        });
      };
    }
  );

  app.directive('cvDatePicker', function () {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
        dateValue: "=",
        show: "=",
        chValue: "=",
        chUse: "="
      },
      template: '<div>' +
      '<input ng-model="dateValue" ng-show="show" type="date">' +
      '<div ng-hide="show">{{dateValue | dateFilter:chValue:chUse}}</div>' +
      '<ng-transclude></ng-transclude>' +
      '</div>',
      link: function (scope, element, attrs) {
      }
    }
  });


  app.directive('removeOutline', function () {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        element.on('click', function () {
          element.blur();
        })
      }
    }
  });

  app.directive('createDocument', function () {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
      }
    }
  });

  app.directive("contenteditable", function () {
    return {
      restrict: "A",
      require: "ngModel",
      link: function (scope, element, attrs, ngModel) {

        function read() {
          var html = element.html();
          html = html.replace(/&nbsp;/g, "\u00a0");
          ngModel.$setViewValue(html);
        }

        ngModel.$render = function () {
          element.html(ngModel.$viewValue || "");
        };

        element.bind("blur keyup change", function () {
          scope.$apply(read);
        });
      }
    };
  });

  app.filter('dateFilter', function () {
    return function (input, toPresent, useFilter) {
      return toPresent && useFilter ? "Present" : moment(input).format('DD-MM-YYYY');
    }
  });

})
();
