var admin_app = angular.module("admin-app", ["myapp.config"]);
admin_app.controller("admin-controller", ['$scope', '$http', '$interval', 'API_URL', 'COMPANY', function($scope, $http, $interval, API_URL, COMPANY) {

    $scope.get_games = function(){
        var url = API_URL + "/getgames";
        console.log(url)
        var data = {id: 1}
        var header = {"Content-Type": "application/json"};
        $http.post(url, data, header).then(function (response) {
            if (response.data){
                console.log(response.data);
                $scope.all_games = response.data;
            }
         });
    }
    $scope.get_games();

}]);
