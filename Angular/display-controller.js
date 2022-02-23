var display_app = angular.module("display-app", ["myapp.config"]);
display_app.controller("display-controller", ['$scope', '$http', '$interval', 'DISP_API_URL', 'COMPANY', function($scope, $http, $interval, DISP_API_URL, COMPANY) {

    $scope.company = COMPANY;

    $scope.get_current_game = function(){
        var url = DISP_API_URL + "/getactivegame";
        console.log(url)
        var data = {id: 1}
        var header = {"Content-Type": "application/json"};

        // game data
        $http.post(url, data, header).then(function (response) {
            //console.log(response.data)

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
                $scope.meron_entry = response.data[1], 15;
                $scope.wala_entry = response.data[2], 15;
                // get aggregates should run in sync with get_current_game so game_id will have a value
                $scope.get_aggregates();
            }
        });
    }
    $scope.get_current_game()
    $interval($scope.get_current_game, 5000);


    $scope.get_aggregates = function(){
        var url = DISP_API_URL + "/getaggregates";

        var data = { username: $scope.username, game_id: $scope.game_id };
        var header = {"Content-Type": "application/json"};

        //console.log(data)
        $http.post(url, data, header).then(function (response) {
            //console.log(response.data)
            if (response.data == "Error"){
                $scope.page_message = "error encountered. contact application administrator.";
            }
            else{
                //console.log(response.data);
                $scope.meron_total_bets = response.data[0][0][1];
                $scope.wala_total_bets = response.data[0][1][1];
                $scope.meron_payout = response.data[1]
                $scope.wala_payout = response.data[2]

            }
        });
    }



    $scope.get_last_next_games = function(){
        var url = DISP_API_URL + "/getalastnextgames";
        var data = {id:1 };
        var header = {"Content-Type": "application/json"};

        //console.log(data)
        $http.post(url, data, header).then(function (response) {
            console.log(response.data)
            if (response.data == "Error"){
                $scope.page_message = "error encountered. contact application administrator.";
            }
            else{
                $scope.last_10_games = response.data[0];
                $scope.next_10_games = response.data[1];
            }
        });
    }
    $scope.get_last_next_games()
    $interval($scope.get_last_next_games, 60000);



    $scope.winner_style = function(my_bet, winner){
        if (my_bet == 'M' && winner == 'M'){
            return {'background-color': '#87E36D'};
        }
        else if(my_bet == 'W' && winner == 'W'){
            return {'background-color': '#F5967F'};
        }
        else{
            return {}
        }
    }

}]);
// add when going live
//document.addEventListener('contextmenu', event => event.preventDefault());
