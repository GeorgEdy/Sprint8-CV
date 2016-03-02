'use strict';

/**
 * @ngdoc overview
 * @name sprint8App
 * @description
 * # sprint8App
 *
 * Main module of the application.
 */
angular
  .module('sprint8App', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/list', {
        templateUrl: 'views/list.html',
        controller: 'ListCtrl',
        controllerAs: 'list'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
