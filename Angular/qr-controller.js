var qr_app = angular.module("qr-app", []);
qr_app.controller("qr-controller", function($scope, $http, $interval) {

    var URL = 'http://192.168.68.111';
    var PORT = 5000;
    var API = URL + ':' + PORT;


    $scope.generate_qrcode = function(){
        var absUrl = "http://192.168.68.111:80/cashout.html?id=20220216210700ASHD1273S7";
        $scope.qrCode = 'https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=' + absUrl + '&choe=UTF-8';
    };

    $scope.close_qrcode = function(){
        var url = API + "/terminate";
        var data = { user_name:  sessionStorage.getItem("username")};
        var header = {"Content-Type": "application/json"};

        window.location.replace("/bet.html");
    };


});
