var qr_app = angular.module("qr-app", ["myapp.config"]);
qr_app.controller("qr-controller", ['$scope', '$http', '$interval', 'API_URL', 'BASE_URL', function($scope, $http, $interval, API_URL, BASE_URL) {


    $scope.generate_qrcode = function(){
        var absUrl = BASE_URL + "/cashout.html?id=20220216210700ASHD1273S7";
        $scope.qrCode = 'https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=' + absUrl + '&choe=UTF-8';
    };

    $scope.close_qrcode = function(){
        var url = API_URL + "/terminate";
        var data = { user_name:  sessionStorage.getItem("username")};
        var header = {"Content-Type": "application/json"};

        window.location.replace("/bet.html");
    };


}]);
