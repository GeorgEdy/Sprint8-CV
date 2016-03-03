'use strict';

(function () {
  var app = angular.module('sprint8App');

  //controllers
  app.controller('MainCtrl', function ($scope, FieldActions) {

    $scope.showButtons = {work: false, education: false, languages: false, proSkills: false};
    $scope.cvName = 'Untitled CV';
    $scope.personalDetails = {
      name: 'Ghinea Razvan',
      currPos: '',
      aboutMe: 'Je suis smecher',
      phoneNumber: '',
      address: 'Cucuietii din deal',
      email: '',
      website: '',
      skype: '',
      linkedin: ''
    };
    $scope.workingExperience = [
      {
        position: 'Junior Programmer',
        company: 'Umbrella Corporation',
        description: 'Programming killer software',
        dateStart: '2010-05-10',
        dateEnd: '2014-05-10'
      },
      {
        position: 'Manager Assistant',
        company: 'Red Box',
        description: 'No ideea what I am doing here',
        dateStart: '2014-05-10',
        dateEnd: '2015-05-10'
      }
    ];
    $scope.education = [
      {
        degree: 'BAC',
        school: 'Numaru 9',
        description: 'best school ever',
        dateStart: '2014-05-10',
        dateEnd: '2015-05-10'
      }
    ];
    $scope.languages = [
      {
        name: 'english',
        understanding: 'C1',
        speaking: 'B2',
        writing: 'B2'
      }
    ];
    $scope.skills = 'smecherie';

    $scope.addField = function (name) {
      //FieldActions.addField($scope, name);
      if (name === 'workingExperience') {
        $scope.workingExperience.push({
          position: '',
          company: '',
          description: ''
        })
      }
    };

    $scope.deleteField = function (name, event) {
      var index = $(event.target).data('id');
      if (name === 'workingExperience') {
        $scope.workingExperience.splice(index, 1);
      }
    };

  });

  //services

  app.factory('FieldActions', function () {
    return (function () {
      var addField = function ($scope, name) {
        if (name === 'workingExperience') {
          $scope.workingExperience.push({
            position: '',
            company: '',
            description: ''
          });
        }
      };

      var deleteField = function ($scope, name, index) {
        if (name === 'workingExperience') {
          $scope.workingExperience.splice(index, 1);
        }
      };

      return {
        addField: addField,
        deleteField: deleteField
      }
    });
  });

  app.directive('datePicker', function ($compile, $templateCache) {
    return {
      replace: true,
      transclude: true,
      template: '<span><span ng-include="template"></span></span>',
      scope: {
        dateValue: '@dateValue'
      },
      link: function ($scope, element, attributes) {
        $scope.dateValue = attributes.date;
        attributes.$observe('show', function (value) {
          //scope.template = (value === true) ? : 'views/spanDate.html';
          if (value === true) {
            $scope.template = 'views/input.html';
          } else {
            $scope.template = 'views/spanDate.html';
          }
          //$scope.$apply();
          $compile(element.contents())($scope);
          console.log(value, $scope.template);
        });

      }
    };
  });

})();

