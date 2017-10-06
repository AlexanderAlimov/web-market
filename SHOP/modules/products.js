var module = angular.module("productApp",[]);
module.controller("prdCtrl",function($scope,$http,$rootScope){
	$scope.products=[];
	$scope.loadproduct=function(obj){
		$http.post('/loadData',obj).then(function(data){
			//console.log(data.data);
			$scope.products=data.data;
			$rootScope.$broadcast('event1',{res:$scope.products});
		})

	}
	$scope.loadproduct();

	$scope.delete=function(product){
		$http.post('/deleteproduct',product).then(function(data){
			//console.log(data);
			$scope.loadproduct();
		})
		//console.log(product)
	}

	$scope.addProduct=function(product){
		$http.post('/addproducts',product).then(function(data){
			//console.log(data);
			$scope.loadproduct();
			$scope.showAdminProducts();
		})
	}
	$scope.updateProduct=function(product){
		$http.post('/updateproducts',product).then(function(data){
			//console.log(data);
			$scope.loadproduct();
			$scope.showAdminProducts();
		})
	}

	$scope.updateOrAdd=function(product){
		$scope.newp=product||{};
		$scope.addProductview();
	}
	$scope.saveProduct=function(product){
		if(product._id)
			$scope.updateProduct(product);
		else
			$scope.addProduct(product);
	}


})