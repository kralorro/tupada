var login_app = angular.module("login-app", []);
login_app.controller("login-controller", function($scope, $http, $interval) {

    var URL = 'http://192.168.68.111';
    var PORT = 5000;
    var API = URL + ':' + PORT;

    $scope.do_login = function(){
        console.log($scope.uname)

        var url = API + "/authenticate";
        var data = { user_name: $scope.uname, password: $scope.pword };
        var header = {"Content-Type": "application/json"};
        $http.post(url, data, header).then(function (response) {
            if (response.data){
                console.log(response.data)
                if (response.data[1] == 1){
                    $scope.page_message = "You are currently logged in on another device."
                }
                else{
                    console.log("Success")
                    sessionStorage.setItem("username", $scope.uname);
                    if (response.data[2] == 'A'){
                        window.location.replace("/admin.html");
                    }
                    else if (response.data[2] == 'T'){
                        window.location.replace("/bet.html");
                    }
                }
            }

            else{
                $scope.page_message = "Invalid Username and/or Password"
            }
         });
    };



});
