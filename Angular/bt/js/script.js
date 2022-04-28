var app = angular.module("myModule", [])
				.controller("myController", function($scope, $http, $timeout){
					$http.get('data.php').then(function(response){
						$scope.members = response.data;
					});
					
					$scope.saveData = function(){
						if($scope.firstname == null || $scope.lastname == null || $scope.gender == null || $scope.age == null){
							alert("Please complete the required field");
						}else{
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
					
					$scope.getData = function(){
						$http.get('data.php').then(function(response){
							$scope.members = response.data;
						});
					}
				});