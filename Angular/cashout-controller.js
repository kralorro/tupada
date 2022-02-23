var cashout_app = angular.module("cashout-app", ["myapp.config"]);
cashout_app.controller("cashout-controller", ['$scope', '$http', '$interval', 'API_URL', 'COMPANY', function($scope, $http, $interval, API_URL, COMPANY) {

    $scope.company = COMPANY;

    $scope.get_wager_data = function(){

        if (sessionStorage.getItem("username") == null){
            window.location.replace("/index.html");
        }
        $scope.username = sessionStorage.getItem("username");

        const queryString = window.location.search;
        console.log(queryString);

        const urlParams = new URLSearchParams(queryString);
        const id = urlParams.get('id');

        $scope.bet_id = id;

        var url = API_URL + "/getbetresults";
        var data = {id: id}
        var header = {"Content-Type": "application/json"};

        $scope.can_cashout = false;
        $http.post(url, data, header).then(function (response) {
            console.log(response.data)
            if (response.data){
                $scope.game_code = response.data[0];
                if (response.data[1] == "M"){
                    $scope.wager_on = "MERON";
                }
                else{
                    $scope.wager_on = "WALA";
                }

                $scope.bet_amount = response.data[2];
                $scope.payout_amount = response.data[3];

                if (response.data[4] == response.data[1]){
                    $scope.status = "WINNER";
                }
                else{
                    $scope.status = "LOSER";
                }

                if (response.data[5] == "C"){
                    $scope.pay_status = "CASHED OUT"
                }
                else{
                    $scope.pay_status = "OPEN/UNCLAIMED"
                }

                $scope.is_cashout_allowed = is_cashout_allowed($scope.status, response.data[5])
            }
        });
    };


    $scope.do_cashout = function(value){
        $scope.username = sessionStorage.getItem("username");
        var url = API_URL + "/cashout";
        var data = {id: value, teller: $scope.username}
        var header = {"Content-Type": "application/json"};

        $http.post(url, data, header).then(function (response) {
            console.log(response.data)
            if (response.data == "Error"){
                $scope.page_message = "error encountered. contact application administrator.";
            }
            else{
                console.log(response.data)
                window.location.replace("/bet.html");
            }
        });
    };


    $scope.close_cashout = function(){
        var data = { user_name:  sessionStorage.getItem("username")};
        var header = {"Content-Type": "application/json"};

        window.location.replace("/bet.html");
    };

}]);

function is_cashout_allowed(bet_status, pay_status){

        if(bet_status == "WINNER" && pay_status == "O"){
            return true;
        }
        else{
            return false;
        }
}
// add when going live
//document.addEventListener('contextmenu', event => event.preventDefault());
