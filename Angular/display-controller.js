var display_app = angular.module("display-app", []);
display_app.controller("display-controller", ['$scope', '$http', '$interval', 'API_URL', function($scope, $http, $interval, API_URL) {

    var URL = 'http://192.168.68.111';
    var PORT = 5000;
    var API = URL + ':' + PORT;
}]);
