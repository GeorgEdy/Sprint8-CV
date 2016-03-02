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

    var checkDisplayButtons = true;

    $scope.displayButtons = function (event) {
      var parent = event.target.parentNode;
      if(checkDisplayButtons) {
        while (!$(parent).hasClass('hide-buttons')) {
          parent = parent.parentNode;
        }
        $(parent).removeClass('hide-buttons');
        checkDisplayButtons = false;
      }
    };

    $scope.cancelAction = function () {
      $(event.target.parentNode).addClass('hide-buttons');
      checkDisplayButtons = true;
    };

    $scope.saveAction = function () {
      $(event.target.parentNode).addClass('hide-buttons');
      checkDisplayButtons = true;
    };

  });
