var display_app = angular.module("display-app", []);
display_app.controller("display-controller", function($scope, $http, $interval) {

    var URL = 'http://192.168.68.111';
    var PORT = 5000;
    var API = URL + ':' + PORT;
});
