var angular = require('angular');
$ = jQuery = require('jquery');
require('angular-ui-router');
require('../../node_modules/bootstrap/dist/js/bootstrap');
require('./config.js');
require('ng-dialog');


var Weather = require('./services/weather.js');
var HomeCtrl = require('./controllers/home.js');
var averageTemperatureFilter = require('./filter/averageTemperature.js');

var app = angular.module('weatherApp', ['ui.router', 'ngDialog'])
    .factory('Weather', ['$http', Weather])
    .controller('HomeController', ['$scope', '$rootScope', 'Weather','ngDialog', HomeCtrl])
    .filter('averageTemperature', averageTemperatureFilter)
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/',
                cache: false,
                templateUrl: 'views/home.html',
                controller: 'HomeController'
            });

        $urlRouterProvider.otherwise('/');

    }]);