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
      ],
      education: [
        {
          degree: 'BAC',
          school: 'Numaru 9',
          description: 'best school ever',
          dateStart: '2014-05-10',
          dateEnd: '2015-05-10'
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
      scope: {
        dateValue: '@dateValue'
      },
      link: function ($scope, element, attributes) {
        $scope.dateValue = attributes.date;
        attributes.$observe('show', function (value) {
          //scope.template = (value === true) ? : 'views/spanDate.html';
          if (value === true) {
            var span = document.createElement('span');
          } else {
            $scope.template = 'views/spanDate.html';
          }

        });

        element.on('click', function () {
        });
      }
    };
  });

  app.filter('dateFilter', function () {
    return function (input) {
      return moment(input);
    }
  });

})
();

