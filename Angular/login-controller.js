var login_app = angular.module("login-app", ["myapp.config"]);
login_app.controller("login-controller", ['$scope', '$http', '$interval', 'API_URL', 'COMPANY', function($scope, $http, $interval, API_URL, COMPANY) {

    $scope.company = COMPANY;

    $scope.do_login = function(){
        console.log($scope.uname)

        var url = API_URL + "/authenticate";

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

}]);
// add when going live
document.addEventListener('contextmenu', event => event.preventDefault());
