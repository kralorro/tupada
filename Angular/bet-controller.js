var bet_app = angular.module("bet-app", ["myapp.config"]);
bet_app.controller("bet-controller", ['$scope', '$http', '$interval', 'API_URL', 'COMPANY', function($scope, $http, $interval, API_URL, COMPANY) {

    $scope.username = sessionStorage.getItem("username");
    $scope.company = COMPANY;

    $scope.get_current_game = function(){
        var url = API_URL + "/getactivegame";
        var data = {id: 1}
        var header = {"Content-Type": "application/json"};

        if (sessionStorage.getItem("username") == null){
            window.location.replace("/index.html");
        }
        $scope.username = sessionStorage.getItem("username");

        // game data
        $http.post(url, data, header).then(function (response) {
            console.log(response.data)

            if (response.data == "Error"){
                $scope.page_message = "error encountered. contact application administrator.";
            }
            else if(response.data == "No Active"){
                $scope.has_active = false;
                $scope.game_id = "NO ACTIVE GAME";
                // get aggregates should run in sync with get_current_game so game_id will have a value
                $scope.get_aggregates();
            }
            else{
                $scope.has_active = true;
                $scope.game_id = response.data[0];
                $scope.meron_entry = trim(response.data[1], 15);
                $scope.wala_entry = trim(response.data[2], 15);
                // get aggregates should run in sync with get_current_game so game_id will have a value
                $scope.get_aggregates();
            }
        });
    }
    $scope.get_current_game()
    $interval($scope.get_current_game, 30000);


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


    $scope.get_aggregates = function(){
        var url = API_URL + "/getaggregates";

        var data = { username: $scope.username, game_id: $scope.game_id };
        var header = {"Content-Type": "application/json"};

        //console.log(data)
        $http.post(url, data, header).then(function (response) {
            console.log(response.data)
            if (response.data == "Error"){
                $scope.page_message = "error encountered. contact application administrator.";
            }
            else{
                console.log(response.data);
                $scope.teller_running_total_bets = response.data[0][0];
                $scope.teller_running_total_withdraw = response.data[1][0];
                console.log(response.data[2][0][1])
                $scope.meron_total_bets = response.data[2][0][1];
                $scope.wala_total_bets = response.data[2][1][1];
                $scope.meron_payout = response.data[3]
                $scope.wala_payout = response.data[4]

            }
        });
    }
    $interval($scope.get_aggregates, 20000);


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

function trim(target, size){
    if (target.length > 15) {
        return target.substring(0, size-3) + "...";
    }
    else{
        return target;
    }
}
// add when going live
//document.addEventListener('contextmenu', event => event.preventDefault());

