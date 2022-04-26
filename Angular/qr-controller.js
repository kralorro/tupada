var qr_app = angular.module("qr-app", ["myapp.config"]);
qr_app.controller("qr-controller", ['$scope', '$http', '$interval', 'API_URL', 'BASE_URL', 'COMPANY', 'CLIENT', function($scope, $http, $interval, API_URL, BASE_URL, COMPANY, CLIENT) {

    $scope.company = COMPANY;
    $scope.client = CLIENT;
    $scope.username = sessionStorage.getItem("username");

    $scope.generate_qrcode = function(){

        if (sessionStorage.getItem("username") == null){
            window.location.replace("/index.html");
        }

        const queryString = window.location.search;
        console.log(queryString);

        const urlParams = new URLSearchParams(queryString);
        const id = urlParams.get('id');

        $scope.bet_id = id;
        $scope.game_id = id.substring(19,23);
        t_wager = id.substring(23,24);
        if (t_wager == 'M'){
            $scope.wager = 'MERON';
        }
        else{
            $scope.wager = 'WALA';
        }

        $scope.amount = id.substring(24);

        var absUrl = BASE_URL + "/cashout.html?id=" + id;
        $scope.bet_url = absUrl;

        $scope.qrCode = 'https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=' + absUrl + '&choe=UTF-8';
    };

    $scope.close_qrcode = function(){
        var data = { user_name:  sessionStorage.getItem("username")};
        var header = {"Content-Type": "application/json"};

        window.location.replace("/bet.html");
    };

    $scope.print_qr = function(area){
        /*
        var print_contents = document.getElementById(area).innerHTML;
        var original_content = document.body.innerHTML;
        document.body.innerHTML = print_contents;
        window.print();
        */
        var innerContents = document.getElementById(area).innerHTML;
        var popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
        popupWinindow.document.open();
        popupWinindow.document.write('<html align="center"><head><link rel="stylesheet" type="text/css" href="bets.css" /></head><body onload="window.print()">' + innerContents + '</html>');
        popupWinindow.document.close();
    };

}]);
// add when going live
//document.addEventListener('contextmenu', event => event.preventDefault());
