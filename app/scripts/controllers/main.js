'use strict';

(function () {
  var app = angular.module('sprint8App');

  //controllers
  app.controller('MainCtrl', function ($scope) {

    $scope.showButtons = {work: false, education: false, languages: false, proSkills: false};
    $scope.data = {
      cvName: 'Untitled CV',
      personalDetails: {
        name: 'Gogu Caldararu',
        currPos: '',
        aboutMe: 'Je suis smecher',
        phoneNumber: '',
        address: 'Cucuietii din deal',
        email: '',
        website: '',
        skype: '',
        linkedin: ''
      },
      workingExperience: [
        {
          position: 'Junior Programmer',
          company: 'Umbrella Corporation',
          description: 'Programming killer software',
          dateStart: new Date(2017, 10, 10),
          dateEnd: new Date(2009, 10, 10),
          toPresent: false
        },
        {
          position: 'Manager Assistant',
          company: 'Red Box',
          description: 'No ideea what I am doing here',
          dateStart: new Date(2009, 10, 10),
          dateEnd: new Date(2013, 10, 10),
          toPresent: false
        }
      ],
      education: [
        {
          degree: 'BAC',
          school: 'Numaru 9',
          description: 'best school ever',
          dateStart: new Date(2004, 10, 10),
          dateEnd: new Date(2006, 10, 10),
          toPresent: false
        }
      ],
      languages: [
        {
          name: 'english',
          understanding: 'C1',
          speaking: 'B2',
          writing: 'B2'
        }
      ],
      skills: 'smecherie'
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

    $scope.deleteField = function (name, event, index) {
      if (name === 'workingExperience') {

        $scope.data.workingExperience.splice(index, 1);
      } else if (name === 'education') {
        $scope.data.education.splice(index, 1);
      } else {
        $scope.data.languages.splice(index, 1);
      }
    };

  });

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

