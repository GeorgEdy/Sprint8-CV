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
        description: 'Programming killer software'
      },
      {
        position: 'Manager Assistant',
        company: 'Red Box',
        description: 'No ideea what I am doing here'
      }
    ],
      education: [
      {
        degree: 'BAC',
        school: 'Numaru 9',
        description: 'best school ever'
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

    $scope.deleteField = function (name, event) {
      var index = $(event.target).data('id');
      console.log(index);
      if (name === 'workingExperience') {
        $scope.data.workingExperience.splice(index, 1);
      } else if (name === 'education') {
        $scope.data.education.splice(index, 1);
      } else {
        $scope.data.languages.splice(index, 1);
      }
    };

  });


})();

