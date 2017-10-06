var module = angular.module("loginApp",[]);
module.controller("loginCtrl",function($scope,$http){
	$scope.visible=true;
	$scope.loginControl=function(){
		$http.get('/logincontrol').then(function(data){
			console.log(data);
			$scope.user=data.data;
		})
	}
	$scope.loginControl();
	$scope.logout=function(){
		$http.get('/logout').then(function(data){
			console.log(data);
		})
	}
})




