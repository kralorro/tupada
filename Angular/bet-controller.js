var bet_app = angular.module("bet-app", []);
bet_app.controller("bet-controller", function($scope, $http, $interval) {

    var URL = 'http://192.168.68.111';
    var PORT = 5000;
    var API = URL + ':' + PORT;

    $scope.username = sessionStorage.getItem("username");

    $scope.get_current_game = function(){
        $scope.username = sessionStorage.getItem("username");

        $scope.meron_total_bets = 423100;
        $scope.wala_total_bets = 510900;



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
        window.location.replace("/qrcode.html?id=20220216211523MASDGWTSGTGF");
    }


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
