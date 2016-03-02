'use strict';

(function () {
  var app = angular.module('sprint8App');

  //controllers
  app.controller('MainCtrl', function ($scope, FieldActions) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

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
        description: 'Programming killer software'
      },
      {
        position: 'Manager Assistant',
        company: 'Red Box',
        description: 'No ideea what I am doing here'
      }
    ];

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

})();

