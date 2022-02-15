var login_app = angular.module("bet-app", []);
login_app.controller("bet-controller", function($scope, $http, $interval) {
    var URL = 'http://localhost';
    var PORT = 5000;
    var API = URL + ':' + PORT;

    $scope.fights = ["1001: Kim Wong Farm vs Bungot Farm Dulag", "1002: Dagul vs RayumaNat"];
    $scope.fight = $scope.fights[0];
    console.log($scope.fights);

    $scope.meron_total_bets = 423100;
    $scope.wala_total_bets = 510900;

    $scope.username = sessionStorage.getItem("username");
    $scope.teller_running_total_bets = 55120;
    $scope.teller_running_total_withdraw = 25000
});
