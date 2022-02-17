var bet_app = angular.module("bet-app", ["myapp.config"]);
bet_app.controller("bet-controller", ['$scope', '$http', '$interval', 'API_URL', function($scope, $http, $interval, API_URL) {

    $scope.username = sessionStorage.getItem("username");

    $scope.get_current_game = function(){

        if (sessionStorage.getItem("username") == null){
            window.location.replace("/index.html");
        }

        $scope.username = sessionStorage.getItem("username");

        $scope.meron_total_bets = 423100;
        $scope.wala_total_bets = 510900;

        $scope.game_id = 1001;

        $scope.teller_running_total_bets = 55120;
        $scope.teller_running_total_withdraw = 25000

        var meron = "Kim Wong/Dagul XXL 100 Super Stag";
        var wala  = "Bam Serrano Palo-Alto Stag Farm";

        if (meron.length > 15){
            $scope.meron_entry = meron.substring(0, 12) + "...";
        }
        else{
            $scope.meron_entry = meron;
        }

        if (wala.length > 15){
            $scope.wala_entry = wala.substring(0, 12) + "...";
        }
        else{
            $scope.wala_entry = wala;
        }
    }


    $scope.do_bet_meron = function(){

        var url = API_URL + "/placebet";

        var data = { username: $scope.username, bet_amount: $scope.bet_amount, game_id: $scope.game_id, player_code: "M" };
        var header = {"Content-Type": "application/json"};
        console.log(data)


        if ($scope.bet_amount){
            $http.post(url, data, header).then(function (response) {
                console.log(response.data)
                if (response.data == "Error"){
                    $scope.page_message = "error encountered. contact application administrator.";
                }
                else{
                    console.log(response.data)
                    window.location.replace("/qrcode.html?id=" + response.data);
                }
             });
            //var random_id = "20220216211523MASDGWTSGTGF";

        }
        else{
            console.log("BET AMOUNT" + $scope.bet_amount);
            $scope.page_message = "please input a valid amount.";
        }

    }

    $scope.do_bet_wala = function(){

        var url = API_URL + "/placebet";

        var data = { username: $scope.username, bet_amount: $scope.bet_amount, game_id: $scope.game_id, player_code: "W" };
        var header = {"Content-Type": "application/json"};
        console.log(data)


        if ($scope.bet_amount){
            $http.post(url, data, header).then(function (response) {
                console.log(response.data)
                if (response.data == "Error"){
                    $scope.page_message = "error encountered. contact application administrator.";
                }
                else{
                    console.log(response.data)
                    window.location.replace("/qrcode.html?id=" + response.data);
                }
             });
        }
        else{
            console.log("BET AMOUNT" + $scope.bet_amount);
            $scope.page_message = "please input a valid amount.";
        }

    }


    $scope.do_logout = function(){
        var url = API_URL + "/terminate";
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

}]);
