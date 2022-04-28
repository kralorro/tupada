var app = angular.module("myModule", ["myapp.config"])
		.controller("myController",  ['$scope', '$http', '$interval', 'API_URL', 'COMPANY', function($scope, $http, $interval, API_URL, COMPANY){
							
		$scope.saveData1 = function(){
			alert(document.getElementById("hdnGameID1").value);
			alert($scope.hdnGameID1);
			if($scope.fight_sequence == null || $scope.meron == null){
				alert("Please complete the required field");
			}else{
				alert($scope.meron);
				$http.post("save.php", {firstname: $scope.firstname, lastname: $scope.lastname, age: $scope.age, gender: $scope.gender})
					.then(function(){
						$scope.firstname = "";
						$scope.lastname = "";
						$scope.age = "";
						$scope.gender = "";
						$scope.getData();
						$(document).ready(function(){
							$("#form_modal #close").click();
						});
								
					});	
			}
						
		}

		$scope.addGame = function(){
			var url = API_URL + "/addGame";
			$scope.fightNo = document.getElementById("fight_sequence").value;
			$scope.status = document.getElementById("status").value;
			$scope.meron = document.getElementById("meron").value;
			$scope.wala = document.getElementById("wala").value;
			if (!$scope.fightNo){
				alert('Please input fight no.');
				document.getElementById("fight_sequence").focus();
			}
			else if (!$scope.meron){
				alert('Please input Meron.');
				document.getElementById("meron").focus();
			}
			else if (!$scope.wala){
				alert('Please input Wala.');
				document.getElementById("wala").focus();
			}
			else{
				var data = { game_status: $scope.status, player_meron: $scope.meron, player_wala:$scope.wala, fight_sequence: $scope.fightNo, derbyID: "1"};
        		var header = {"Content-Type": "application/json"};
        		console.log(data)
				alert($scope.status + " " + $scope.meron + " " + $scope.wala + " " + $scope.fightNo + " ");

        		$http.post(url, data, header).then(function (response) {
					console.log(response.data)
					if (response.data == "Error"){
						$scope.page_message = "error encountered. contact application administrator.";
						alert("Error encountered. Contact App Admin");
					}
					else{
						console.log(response.data)
						window.location.replace("/admin.html");
					}
				 });

			}
			
						
		}

		$scope.updateGame = function(){
			var url = API_URL + "/updateGame";
			$scope.fightNoEdit = document.getElementById("fightNoEdit").value;
			$scope.gameID = document.getElementById("hdnGameID_update").value;
			$scope.statusEdit = document.getElementById("statusEdit").value;
			$scope.meronEdit = document.getElementById("meronEdit").value;
			$scope.walaEdit = document.getElementById("walaEdit").value;
			if (!$scope.fightNoEdit){
				alert('Please input fight no.');
				document.getElementById("fightNoEdit").focus();
			}
			else if (!$scope.meronEdit){
				alert('Please input Meron.');
				document.getElementById("meronEdit").focus();
			}
			else if (!$scope.walaEdit){
				alert('Please input Wala.');
				document.getElementById("walaEdit").focus();
			}
			else{
				var data = { game_id: $scope.gameID, game_status: $scope.statusEdit, player_meron: $scope.meronEdit, player_wala:$scope.walaEdit, fight_sequence: $scope.fightNoEdit, derbyID: "1"};
        		var header = {"Content-Type": "application/json"};
        		console.log(data)
			
        		if ($scope.gameID){
            		$http.post(url, data, header).then(function (response) {
                		console.log(response.data)
                		if (response.data == "Error"){
                    		$scope.page_message = "error encountered. contact application administrator.";
							alert("Error encountered. Contact App Admin");
                		}
                		else{
                    		console.log(response.data)
                    		window.location.replace("/admin.html");
                		}
             		});

        		}
        		else{
            		console.log("GameID: " + $scope.gameID);
            		$scope.page_message = "invalid game ID";
					alert("Invalid GameID");
        		}

			}
			
						
		}

		$scope.activateGame = function(){
			var url = API_URL + "/activateGame";
			$scope.gameID = document.getElementById("hdnGameID_Activate").value
        	var data = { game_id: $scope.gameID, game_status: "A" };
        	var header = {"Content-Type": "application/json"};
        	console.log(data)
			
        	if ($scope.gameID){
            	$http.post(url, data, header).then(function (response) {
                	console.log(response.data)
                	if (response.data == "Error"){
                    	$scope.page_message = "error encountered. contact application administrator.";
						alert("Error encountered. Contact App Admin");
                	}
                	else{
                    	console.log(response.data)
                    	window.location.replace("/admin.html");
                	}
             	});

        	}
        	else{
            	console.log("GameID: " + $scope.gameID);
            	$scope.page_message = "invalid game ID";
				alert("Invalid GameID");
        	}
						
		}

		$scope.cancelGame = function(){
			var url = API_URL + "/updateGameStatus";
			$scope.gameID = document.getElementById("hdnGameID_Cancel").value;
			$scope.game_status = "C";
			
        	var data = { game_id: $scope.gameID, game_status: $scope.game_status };
        	var header = {"Content-Type": "application/json"};
        	console.log(data);
			
        	if ($scope.gameID){
            	$http.post(url, data, header).then(function (response) {
                	console.log(response.data)
                	if (response.data == "Error"){
                    	$scope.page_message = "error encountered. contact application administrator.";
						alert("Error encountered. Contact App Admin");
                	}
                	else{
                    	console.log(response.data);
                    	window.location.replace("/admin.html");
                	}
             	});

        	}
        	else{
            	console.log("GameID: " + $scope.gameID);
            	$scope.page_message = "invalid game ID";
				alert("Invalid GameID");
        	}
						
		}

		$scope.closeGame = function(){
			var url = API_URL + "/updateGameStatus";
			$scope.gameID = document.getElementById("hdnGameID_Close").value;
			$scope.game_status = "X";
			
        	var data = { game_id: $scope.gameID, game_status: $scope.game_status };
        	var header = {"Content-Type": "application/json"};
        	console.log(data);
			
        	if ($scope.gameID){
            	$http.post(url, data, header).then(function (response) {
                	console.log(response.data)
                	if (response.data == "Error"){
                    	$scope.page_message = "error encountered. contact application administrator.";
						alert("Error encountered. Contact App Admin");
                	}
                	else{
                    	console.log(response.data);
                    	window.location.replace("/admin.html");
                	}
             	});

        	}
        	else{
            	console.log("GameID: " + $scope.gameID);
            	$scope.page_message = "invalid game ID";
				alert("Invalid GameID");
        	}
						
		}

		$scope.get_games = function(){
			var url = API_URL + "/get_games";
			console.log(url)
			var data = {id: 1}
			var header = {"Content-Type": "application/json"};
        	header = {"Access-Control-Allow-Origin" : API_URL};
        	header = {"Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT"}
				
			if (sessionStorage.getItem("username") == null){
				window.location.replace("/index.html");
			}
			$scope.username = sessionStorage.getItem("username");
				
			$http.post(url, data, header).then(function (response) {
				if (response.data){
					console.log(response.data);
					$scope.all_games = response.data;
				}
			});
		}
		$scope.get_games();
}]);