var cashout_app = angular.module("cashout-app", []);
cashout_app.controller("cashout-controller", function($scope, $http, $interval) {

    var URL = 'http://192.168.68.111';
    var PORT = 5000;
    var API = URL + ':' + PORT;


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

    $scope.do_logout = function(){
        var url = API + "/terminate";
        var data = { user_name:  sessionStorage.getItem("username")};
        var header = {"Content-Type": "application/json"};

        sessionStorage.removeItem("username")
        window.location.replace("/index.html");

        /*
        $http.post(url, data, header).then(function (response) {
            if (response.data){
                console.log(response.data)
            }
        });*/
    };

});