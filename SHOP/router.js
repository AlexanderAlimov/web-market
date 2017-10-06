/// підключаємо експрес і створюємо app 
var express=require('express');
var router = express.Router();

/// підєднання моделі
var Product = require('./models/model_products.js')

///////підключаємо категорію
var Category=require('./models/model_category.js')

///////підключаємо модель замовлень
var Order = require('./models/model_order.js')




/// для входа в корень сайта
router.get("/",function(req,res){
	res.sendFile(__dirname+"/views/index.html");
});

///// шлях для загрузки '/loadData'
router.post('/loadData',function(req,res){
	console.log(req.body);
	if(req.body==undefined){
		Product.find(function(err,data){
		console.log("test!!!");
		console.log(data);
		res.send(data);
		})
	}
	else{
		Product.find(req.body,function(err,data){
			console.log("req.body:");
			console.log(req.body);
			console.log("data:");
			console.log(data);
			res.send(data);
		})
	}

	});

////додаємо новий продукт в базу
router.post('/addproducts',function(req,res){
	var product = new Product(req.body);
	product.save(function(err,data){
		res.send(data);
	})
})
////видаляємо продукт
router.post('/deleteproduct',function(req,res){
	console.log(req.body);
	Product.remove(req.body,function(err,data){
		res.send("Product was deleted!");
	})
})

//// апдейтимо продукт
router.post('/updateproducts',function(req,res){
	console.log(req.body);
	Product.update({_id:req.body._id},{
		name:req.body.name,
		model:req.body.model,
		category:req.body.category,
		count:req.body.count,
		price:req.body.price,
		path:req.body.path
	},function(err,data){
		console.log(data);
		res.send("updated!")
	})
})


///// шлях для загрузки '/loadCategory'
router.get('/loadCategory',function(req,res){
	Category.find(function(err,data){
		//console.log("test!!!");
		//console.log(data);
		res.send(data);
	})
});

////додаємо нову категорію в базу
router.post('/addCategory',function(req,res){
	console.log("add:");
	var category= new Category(req.body);
	category.save(function(err,data){
		res.send(data);
	})
})

///видаляємо категорію з бази
router.post('/deleteCategory',function(req,res){
	console.log(req.body);
	Category.remove(req.body,function(err,data){
		res.send("Category was deleted");
	})
})

//// апдейтимо категорію
router.post('/updateCategory',function(req,res){
	console.log("update:");
	console.log(req.body);
	Category.update({_id:req.body._id},{
		categoryname:req.body.categoryname
	},function(err,data){
		console.log(data);
		res.send("Category was upated");
	})
})


router.get('/loadorder',function(req,res){
	Order.find(function(err,data){
		console.log(data);
		res.send(data);
	})

})

////// приймаємо замовлення
router.post('/makeorder',function(req,res){
	console.log("Our order : ");
	console.log(req.body);
	var cart = {cart:req.body};
	console.log("Our arr:");
	console.log(cart);
	var order= new Order(cart);
	order.save(function(err,data){
		console.log("data : ");
		console.log(data);
		res.send(data);
	})
})
////// підтвердження замовлення
router.post('/confirm',function(req,res){
	console.log("confirm order:");
	console.log(req.body);
	console.log(req.body.cart.length);
	for(var i=0;i<req.body.cart.length;i++){
		Product.update({_id:req.body.cart[i]._id},{$inc:{count:-req.body.cart[i].newcount}},function(err,data){
		console.log(data);
		//res.send("updated!")
	});
		console.log(req.body.cart[i]._id);
		console.log(req.body.cart[i].newcount);
	}
	Order.remove(req.body,function(err,data){
		res.send("Order is confirmed and deleted");
	})
	
})


///// експортуємо модуль
module.exports=router;








