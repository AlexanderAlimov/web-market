var module = angular.module("categoryApp",[]);
module.controller("ctgCtrl",function($scope,$http){
	$scope.categorys=[];
	$scope.newc={};
	$scope.selectCategory="";
	$scope.loadcategory=function(){
		$http.get('/loadCategory').then(function(data){
			//console.log(data.data);
			$scope.categorys=data.data;
		})
	}
	$scope.loadcategory();
	$scope.addCategory=function(category){
		$http.post('/addCategory',category).then(function(data){
			//console.log(data);
			$scope.loadcategory();
			$scope.showAdminCategory();
		})
	}
	$scope.updateCategory=function(category){
		$http.post('/updateCategory',category).then(function(data){
			//console.log(data);
			$scope.loadcategory();
			$scope.showAdminCategory();
		})
		//console.log(category);
	}
	$scope.deleteCategory=function(category){
		$http.post('/deleteCategory',category).then(function(data){
			//console.log(data);
			$scope.loadcategory();
		})
		//console.log(category);
	}
	$scope.addOrUpdateCategory=function(category){
		$scope.newc=category||{};
		$scope.addCategoryForm();
		
	}
	$scope.saveCategory=function(category){
		if(category._id)
			$scope.updateCategory(category);
		else
			$scope.addCategory(category);
		console.log(category);
	}
})