var qr_app = angular.module("qr-app", ["myapp.config"]);
qr_app.controller("qr-controller", ['$scope', '$http', '$interval', 'API_URL', 'BASE_URL', 'COMPANY', function($scope, $http, $interval, API_URL, BASE_URL, COMPANY) {

    $scope.company = COMPANY;
    $scope.generate_qrcode = function(){

        if (sessionStorage.getItem("username") == null){
            window.location.replace("/index.html");
        }

        const queryString = window.location.search;
        console.log(queryString);

        const urlParams = new URLSearchParams(queryString);
        const id = urlParams.get('id');

        $scope.bet_id = id;

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
        var print_contents = document.getElementById(area).innerHTML;
        var original_content = document.body.innerHTML;
        document.body.innerHTML = print_contents;
        window.print();
    };

}]);
// add when going live
//document.addEventListener('contextmenu', event => event.preventDefault());
