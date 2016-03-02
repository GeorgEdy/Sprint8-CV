'use strict';

/**
 * @ngdoc function
 * @name sprint8App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sprint8App
 */
angular.module('sprint8App')
  .controller('MainCtrl', function ($scope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.displayButtons = function (event) {
      $(event.target.parentNode).removeClass('hide-buttons');
    };

    $scope.cancelAction = function () {
      $(event.target.parentNode).addClass('hide-buttons');
    };

    $scope.saveAction = function () {
      $(event.target.parentNode).addClass('hide-buttons');
    };

  });
