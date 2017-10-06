var module = angular.module("mainApp",["productApp","cartApp","categoryApp","paginationApp","loginApp"]);
module.controller("mainCtrl",function($scope,$http){
		$scope.current={
		view:"views/products.html",
		heading:"Internet-Shop Products",
	}
	$scope.showCart=function(){
		$scope.current.view="views/cart.html";
		$scope.current.heading="recycle";
	}
	$scope.showProducts=function(){
		$scope.current.view="views/products.html";
		$scope.current.heading="Internet-Shop Products";
	}
	$scope.showAdminProducts=function(){
		$scope.current.view="viewsadmin/adminProduct.html";
		$scope.current.heading="Internet-Shop Products";
	}
	$scope.showAdminCategory=function(){
		$scope.current.view="viewsadmin/adminCategory.html";
		$scope.current.heading="Internet-Shop Products";
	}
	$scope.addProductview=function(){
		$scope.current.view="viewsadmin/addProducts.html";
		$scope.current.heading="form add products";
	}
	$scope.addCategoryForm=function(){
		$scope.current.view="viewsadmin/addCategoryForm.html";
		$scope.current.heading="form add Category";
	}
	$scope.showAdminOrder=function(){
		$scope.current.view="viewsadmin/adminOrders.html";
		$scope.current.heading="Internet-Shop Orders";
	}
})




