'use strict';

var weatherConfig = require('./../config.js');

module.exports = function WeatherService($http) {
    return {
        getForecast: function (callback) {
            return $http({
                method: 'GET',
                url: 'http://api.openweathermap.org/data/2.5/forecast?id='+weatherConfig.city_id+'&units='+weatherConfig.units+'&APPID='+weatherConfig.APPID
            }).success(function (response) {
                callback(response);
            }).error(function (error) {
                callback(error);
            });
        }
    }
};
