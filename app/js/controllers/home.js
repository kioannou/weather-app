var HomeController = function ($scope, $rootScope, Weather, ngDialog) {

    //$scope variables
    angular.extend($scope, {
        forecastData: [],
        selectedForecastIndex: undefined,
        averageTemperature: 0
    });

    angular.extend($scope, {
        openEditModal: function (dt) {

            for (var i = 0; i < $scope.forecastData.list.length; i++) {
                if ($scope.forecastData.list[i].dt === dt) {
                    $scope.selectedForecastIndex = i;
                }
            }

            ngDialog.openConfirm({
                template: '../../views/editModal.html',
                showClose: true,
                overlay: true,
                className: 'ngdialog-theme-default',
                scope: $scope
            }).then(function (value) {
                //SAVE
                sessionStorage.setItem("weather-data", JSON.stringify($scope.forecastData));
            }, function (value) {
                //CLOSE
            });
        }
    });

    var init = function () {
        if (sessionStorage.getItem("weather-data")) {
            $scope.forecastData = JSON.parse(sessionStorage.getItem("weather-data"));
        } else {
            Weather.getForecast(function (response) {
                console.warn("The response is: ", response);
                $scope.forecastData = response;
                sessionStorage.setItem("weather-data", JSON.stringify($scope.forecastData));
            });
        }
    };

    //Initializing the controller
    init();
};

module.exports = HomeController;