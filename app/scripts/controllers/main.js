'use strict';

(function () {
  var app = angular.module('sprint8App');

  //controllers
  app.controller('MainCtrl', function ($scope, StorageService) {
      dragula([document.getElementById('work-drag')]);
      dragula([document.getElementById('education-drag')]);
      dragula([document.getElementById('language-drag')]);
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


      $(window).on('keypress', function (event) {
        //console.log(event.ctrlKey, event.shiftKey, event.keyCode, 'main');
        if (event.shiftKey && (event.which == 90)) {
          console.log('UNDO');
          var docIndex = StorageService.currentDocIndex;
          var index = --StorageService.historyDataIndex;
          if (index > 0) {
            var lastHistoryObj = StorageService.historyQueueChanged[docIndex][index];
            console.log(lastHistoryObj.section, lastHistoryObj.data);
            console.log('scope obj', objectPath.get($scope.data, lastHistoryObj.section));
            objectPath.set(StorageService.data[docIndex], lastHistoryObj.section, lastHistoryObj.data);
            var currentObj = objectPath.get(StorageService.data[docIndex]);
            console.log('last obj', lastHistoryObj);
            console.log('current obj', currentObj);
            $scope.$apply();
          }
        }
        else if (event.ctrlKey && (event.which == 25)) {
          console.log('REDO');
        }
        else if (event.shiftKey && (event.keyCode == 68)) {
          window.onbeforeunload = null;
          localStorage.clear('data');
          StorageService.data = [];
          location.reload();
        }
        else if (event.shiftKey && (event.keyCode == 67)) {
          console.log(StorageService.data);
        }
      });

      var stripHashKey = function (item) {
        var json = JSON.stringify(item, function (key, value) {
          if (key === "$$hashKey") {
            return undefined;
          }
          return value;
        });
        return JSON.parse(json);
      };

      $scope.triggerCaching = function (cacheSection) {
        var index = StorageService.currentDocIndex;
        var sectionData = objectPath.get(StorageService.data[index], cacheSection);
        var lastSectionData = objectPath.get(StorageService.lastData[index], cacheSection);
        //console.log(lastSectionData, sectionData);
        var cleanSectionData = stripHashKey(sectionData);
        //console.log(lastSectionData, sectionData, cleanSectionData);
        //current data
        var historyObject = {
          data: angular.copy(sectionData),
          timestamp: moment(),
          section: cacheSection
        };
        //data before current data
        var lastObject = {
          data: angular.copy(lastSectionData),
          timestamp: moment(),
          section: cacheSection
        };
        //console.log('Section Data', sectionData);
        var historyLength = StorageService.historyQueueOriginal[index].length;
        if (historyLength) {
          console.log('History is NOT empty');
          console.log(StorageService.historyQueueOriginal);
          var length = StorageService.historyQueueOriginal[index].length;
          for (var i = length; i > 0; i--) {
            var cleanHistoryData = stripHashKey(StorageService.historyQueueChanged[index][i - 1].data);
            var sameSection = StorageService.historyQueueOriginal[index][i - 1].section == cacheSection;
            if (sameSection) {
              console.log('Same section');
              if (!_.isEqual(cleanSectionData, cleanHistoryData)) {
                console.log('Not equal');
                StorageService.historyQueueOriginal[index].push(lastObject);
                StorageService.historyQueueChanged[index].push(historyObject);
                StorageService.lastData = angular.copy(StorageService.data);
                StorageService.historyDataIndex = StorageService.historyQueueOriginal[index].length - 1;
                console.log('HISTORY DATA INDEX : ', StorageService.historyDataIndex);
                console.log(StorageService.historyQueueOriginal);

                console.log('QUEUE ORIGINAL');
                console.log(StorageService.historyQueueOriginal);

                console.log('QUEUE CHANGED');
                console.log(StorageService.historyQueueChanged);
                return;
              }
              else {
                console.log('Is equal');
                StorageService.historyDataIndex = StorageService.historyQueueOriginal[index].length - 1;
                console.log('HISTORY DATA INDEX : ', StorageService.historyDataIndex);
                return;
              }
            }

            else {
              console.log('Different section');
            }
          }
        }
        else {
          console.log('History is empty');
          StorageService.initialiseHistory(index);
        }
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
      '<input ng-model="dateValue" ng-show="show" format-date type="date">' +
      '<div ng-hide="show">{{dateValue | dateFilter:chValue:chUse}}</div>' +
      '<ng-transclude></ng-transclude>' +
      '</div>',
      link: function (scope, element, attrs) {
      }
    }
  });


  app.directive("formatDate", function () {
    return {
      require: 'ngModel',
      link: function (scope, elem, attr, modelCtrl) {
        modelCtrl.$formatters.push(function (modelValue) {
          return new Date(modelValue);
        })
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

  app.directive('triggerCaching', function () {
    return {
      restrict: 'A',
      scope: {
        cacheSection: '@',
        triggerFunc: '='
      },
      link: function (scope, element, attrs) {
        $(element).focusout(function () {
          scope.triggerFunc(scope.cacheSection);
        });
      }
    }
  });

  app.filter('dateFilter', function () {
    return function (input, toPresent, useFilter) {
      return toPresent && useFilter ? "Present" : moment(input).format('DD-MM-YYYY');
    }
  });

})
();
