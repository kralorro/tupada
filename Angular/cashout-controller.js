var cashout_app = angular.module("cashout-app", ["myapp.config"]);
cashout_app.controller("cashout-controller", ['$scope', '$http', '$interval', 'API_URL', function($scope, $http, $interval, API_URL) {


    $scope.get_wager_data = function(){
        const queryString = window.location.search;
        console.log(queryString);

        const urlParams = new URLSearchParams(queryString);
        const id = urlParams.get('id');

        $scope.bet_id = id;
        $scope.username = sessionStorage.getItem("username");

        $scope.game_code = "G1001";
        $scope.wager_on = "MERON";
        $scope.bet_amount = 2000;
        $scope.status = 'WIN';
        $scope.payout_amount = 3085;
        $scope.pay_status = 'CASHOUT PENDING';

    };

    $scope.close_cashout = function(){
        var data = { user_name:  sessionStorage.getItem("username")};
        var header = {"Content-Type": "application/json"};

        window.location.replace("/bet.html");
    };

}]);
