module.exports = function(){
    return function(forecastData){
        if(forecastData){
            var sum = 0;
            angular.forEach(forecastData.list ? forecastData.list : [], function (forecastItem, key) {
                sum += (( parseInt(forecastItem.main.temp_max) + parseInt(forecastItem.main.temp_min))/2);
            });
            return isNaN(sum) ? 0 : (sum/forecastData.list.length).toFixed(2);
        }else{
            return 0;
        }
    }
};