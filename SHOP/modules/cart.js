var module = angular.module("cartApp",[]);
module.controller("cartCtrl",function($scope,$http){
	/////масив корзини
	$scope.cart=[];
	$scope.orders=[];
	/////метод додаємо в корзину
	$scope.addProductCart=function(product){
		var pos=$scope.cart.indexOf(product);
		if(pos==-1){
			product.newcount=1;
			product.newprice=product.price;
			$scope.cart.push(product);
		}
		else{
			alert("This product exist in basket!")
		}
	}
	/////обробник на кнопку плюс
	$scope.plusCount=function(product){
		if(product.newcount+1>product.count){
			alert("Sorry, You can't order more!");
			return;
		}
		product.newcount++;
		product.newprice+=product.price;
	}
	/////обробник на кнопку видалити
	$scope.deleteProduct=function(product){
		var pos=$scope.cart.indexOf(product);
		$scope.cart.splice(pos,1);
	}
	/////обробник на кнопку мінус
	$scope.minusProduct=function(product){
		if(product.newcount-1==0)
			$scope.deleteProduct(product)
		product.newcount--;
		product.newprice-=product.price;
	}
	/////функція на загальну вартість
	$scope.sumTotal=function(){
		var total=0;
		for(var i=0;i<$scope.cart.length;i++){
			total+=$scope.cart[i].newprice;
		}
		return total;
	}

	$scope.loadOrders=function(){
		$http.get('/loadorder').then(function(data){
			console.log(data.data);
			$scope.orders=data.data;
		})
	}
	$scope.loadOrders();
	/*$scope.testOrder=function(){
		console.log($scope.orders);
	}*/

	/////////функція відправляє дані на сервер по замовленню
	$scope.makeOrder=function(cart){
		console.log(cart);
		$http.post('/makeorder',cart).then(function(data){
			console.log(data.data);
		})
	}
	$scope.confirmOrder=function(order){
		console.log(order);
		$http.post('/confirm',order).then(function(data){
			console.log(data.data);
			$scope.loadOrders();
		})
	}

})